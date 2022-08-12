import { prisma } from "../../prisma";
import { DeliveryInput, DeliveryRepository } from "../deliveries-repository";

export class PrismaDeliveryRepository implements DeliveryRepository {
  createDelivery({
    item_name,
    client_id,
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

  findAllDeliveriesAvailable(): Promise<DeliveryInput[]> {
    return prisma.deliveries.findMany({
      where: { end_at: null, deliveryman_id: null },
    });
  }

  toAssignDeliveryToDeliveryman({ id, deliveryman_id}: DeliveryInput){
    return prisma.deliveries.update({
      where: { id},
      data: {deliveryman_id}
    });
  }
}
