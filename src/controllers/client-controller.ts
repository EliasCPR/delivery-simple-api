import { Request, Response } from "express";
import { PrismaClientRepository } from "../repository/prisma/prisma-client-repository";
import { ClientService } from "../services/client-service";

const prismaClientRepository = new PrismaClientRepository();
const clientService = new ClientService(prismaClientRepository);

export async function createClient(req: Request, res: Response) {
  const { email, name, password } = req.body;
  

  try {
    const client = await clientService.create({ email, name, password });

    return res.status(201).send(client);
  } catch (e) {
    return res.status(e.code).send({
      message: e.message,
    });
  }
}

export async function listClients(req: Request, res: Response) {
  try {
    const clients = await clientService.list();

    return res.status(200).send(clients);
  } catch (e) {
    return res.status(e.code).send({
      message: e.message,
    });
  }
}

export async function authenticateClient(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const client = await clientService.authenticate({ email, password });

    return res.status(200).send(client);
  } catch (e) {
    return res.status(e.code).send({
      message: e.message,
    });
  }
}