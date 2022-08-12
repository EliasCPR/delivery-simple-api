import { prisma } from "../../prisma";
import { DeliveryInput, DeliveryRepository } from "../deliveries-repository";

export class PrismaDeliveryRepository implements DeliveryRepository {
  createDelivery({
    item_name,
    client_id,
    deliveryman_id,
  }: DeliveryInput): Promise<DeliveryInput> {
    return prisma.deliveries.create({
      data: {
        item_name,
        client_id,
      },
    });
  }

  getDeliveryById(id: string): Promise<DeliveryInput> {
    return prisma.deliveries.findFirst({
      where: { id },
    });
  }
}
