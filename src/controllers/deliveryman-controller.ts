import { Request, Response } from "express";
import { PrismaDeliverymanRepository } from "../repository/prisma/prisma-deliveryman-repository";
import { DeliverymanService } from "../services/deliveryman-service";

const prismaDeliverymanRepository = new PrismaDeliverymanRepository();
const deliveryService = new DeliverymanService(
  prismaDeliverymanRepository
);

export async function createDeliveryman(req: Request, res: Response) {
  const { email, name, password } = req.body;

  try {
    const deliveryman = await deliveryService.create({ email, name, password });

    return res.status(201).send(deliveryman);
  } catch (e) {
    return res.status(e.code).send({
      message: e.message,
    });
  }
}

export async function listDeliverymen(req: Request, res: Response) {
  try {
    const deliverymen = await deliveryService.list();

    return res.status(200).send(deliverymen);
  } catch (e) {
    return res.status(e.code).send({
      message: e.message,
    });
  }
}

export async function authenticateDeliveryman(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const deliveryman = await deliveryService.authenticate({ email, password });

    return res.status(200).send(deliveryman);
  } catch (e) {
    return res.status(e.code).send({
      message: e.message,
    });
  }
}
