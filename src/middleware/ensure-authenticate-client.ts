import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload{
  sub: string;
}
export async function ensureAuthenticateClient(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({});
  }

  const [, token] = authorization.split(" ");

  try {
    const {sub} = verify(token, "secret") as Payload;

    req.client_id = sub;
    
    return next();
  } catch (e) {
    return res.status(401).send({});
  }
}
