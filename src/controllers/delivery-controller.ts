import { Request, Response } from "express";
import { NodemailerMailAdapter } from "../adapters/nodemailer/nodemailer-mail-adapter";

import { PrismaDeliveryRepository } from "../repository/prisma/prisma-deliveries-repositories";
import { DeliveryService } from "../services/delivery-service";

const mailAdapter = new NodemailerMailAdapter();
const prismaDeliveryRepository = new PrismaDeliveryRepository();
const deliveryService = new DeliveryService(prismaDeliveryRepository, mailAdapter);

export async function createDelivery(req: Request, res: Response) {
  const { item_name } = req.body;
  const { client_id } = req;

  try {
    const delivery = await deliveryService.create({ client_id, item_name });

    return res.status(201).send(delivery);
  } catch (e) {
    return res.status(400).send({
      message: e.message,
    });
  }
}

export async function findAllDeliveriesAvailable(req: Request, res: Response) {
  try {
    const deliveries = await deliveryService.findAllDeliveriesAvailable();

    return res.status(200).send(deliveries);
  } catch (e) {
    return res.status(400).send({
      message: e.message,
    });
  }
}

export async function toAssignDeliveryToDeliveryman(
  req: Request,
  res: Response
) {
  const { deliveryman_id } = req;
  const { id } = req.params;

  try {
    const delivery = await deliveryService.toAssignDeliveryToDeliveryman({
      id,
      deliveryman_id,
    });

    return res.status(200).send(delivery);
  } catch (e) {
    return res.status(400).send({
      message: e.message,
    });
  }
}

export async function findAllDeliveriesByClientId(req: Request, res: Response) {
  try {
    const { client_id } = req;
    const deliveries = await deliveryService.findAllDeliveriesByClientId(
      client_id
    );

    return res.status(200).send(deliveries);
  } catch (e) {
    return res.status(400).send({
      message: e.message,
    });
  }
}

export async function findAllDeliveriesByDeliverymanId(
  req: Request,
  res: Response
) {
  try {
    const { deliveryman_id } = req;
    const deliveries = await deliveryService.findAllDeliveriesByDeliverymanId(
      deliveryman_id
    );

    return res.status(200).send(deliveries);
  } catch (e) {
    return res.status(400).send({
      message: e.message,
    });
  }
}

export async function deliveryUpdateEndDate(req: Request, res: Response) {
  try {
    const { deliveryman_id } = req;
    
    const { id } = req.params;

    const delivery = await deliveryService.updateEndAt({
      deliveryman_id, id
    });

    return res.status(200).send({message: "finished delivery successfully"});
  } catch (e) {
    return res.status(400).send({
      message: e.message,
    });
  }
}
