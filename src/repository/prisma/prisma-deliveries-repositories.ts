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

  toAssignDeliveryToDeliveryman({ id, deliveryman_id }: DeliveryInput) {
    return prisma.deliveries.update({
      where: { id },
      data: { deliveryman_id },
    });
  }

  findAllDeliveriesByClientId(client_id: string): Promise<DeliveryInput[]> {
    return prisma.clients.findMany({
      where: { id: client_id },
      select: { deliveries: true, id: true, name: true, password: false },
    });
  }

  findAllDeliveriesByDeliverymanId(
    deliveryman_id: string
  ): Promise<DeliveryInput[]> {
    return prisma.deliveryman.findMany({
      where: { id: deliveryman_id },
      select: { id: true, deliveries: true, name: true },
    });
  }

  updateEndAt({ id, deliveryman_id }: DeliveryInput) {
    return prisma.deliveries.updateMany({
      where: { id, deliveryman_id },
      data: { end_at: new Date() },
    });
  }
}
