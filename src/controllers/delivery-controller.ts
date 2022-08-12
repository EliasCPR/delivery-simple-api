import { Request, Response } from "express";

import { PrismaDeliveryRepository } from "../repository/prisma/prisma-deliveries-repositories";
import { DeliveryService } from "../services/delivery-service";

const prismaDeliveryRepository = new PrismaDeliveryRepository();
const deliveryService = new DeliveryService(prismaDeliveryRepository);

export async function createDelivery(req: Request, res: Response) {
  const { client_id, item_name } = req.body;

  try {
    const delivery = await deliveryService.create({ client_id, item_name });

    return res.status(201).send(delivery);
  } catch (e) {
    return res.status(400).send({
      message: e.message,
    });
  }
}
