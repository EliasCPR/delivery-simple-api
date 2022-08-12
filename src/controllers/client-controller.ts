import { Request, Response } from "express";
import { PrismaClientRepository } from "../repository/prisma/prisma-client-repository";
import { ClientService } from "../services/create-user-service";

const prismaClientRepository = new PrismaClientRepository();
const createClientService = new ClientService(prismaClientRepository);

export async function createClient(req: Request, res: Response) {
  const { email, name, password } = req.body;
  

  try {
    const client = await createClientService.create({ email, name, password });

    return res.status(201).send(client);
  } catch (e) {
    return res.status(400).send({
      message: e.message,
    });
  }
}

export async function listClients(req: Request, res: Response) {
  try {
    const clients = await prismaClientRepository.getClients();

    return res.status(200).send(clients);
  } catch (e) {
    return res.status(400).send({
      message: e.message,
    });
  }
}