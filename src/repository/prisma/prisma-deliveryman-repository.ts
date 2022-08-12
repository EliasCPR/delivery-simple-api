import { prisma } from "../../prisma";
import {
  DeliverymanInput,
  DeliverymanRepository,
} from "../deliveryman-repository";

export class PrismaDeliverymanRepository implements DeliverymanRepository {
  createDeliveryman({
    email,
    password,
    name,
  }: DeliverymanInput): Promise<DeliverymanInput> {
    return prisma.deliveryman.create({
      data: {
        email,
        password,
        name,
      },
    });
  }

  deleteDeliveryman(id: string): Promise<DeliverymanInput> {
    return prisma.deliveryman.delete({
      where: { id },
    });
  }

  getDeliverymanByEmail(email: string): Promise<DeliverymanInput> {
    return prisma.deliveryman.findFirst({
      where: { email },
    });
  }

  getDeliverymanById(id: string): Promise<DeliverymanInput> {
    return prisma.deliveryman.findFirst({
      where: { id },
    });
  }

  getDeliverymen(): Promise<DeliverymanInput[]> {
    return prisma.deliveryman.findMany();
  }

  updateDeliveryman(
    id: string,
    deliveryman: DeliverymanInput
  ): Promise<DeliverymanInput> {
    return prisma.deliveryman.update({
      where: { id: id },
      data: {
        ...deliveryman,
        updated_at: new Date(),
      },
    });
  }
}
