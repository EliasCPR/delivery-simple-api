import { DeliveryInput } from "../repository/deliveries-repository";
import { PrismaDeliveryRepository } from "../repository/prisma/prisma-deliveries-repositories";

export class DeliveryService {
  constructor(private readonly deliveryRepository: PrismaDeliveryRepository) {}

  async create({client_id, item_name}: DeliveryInput): Promise<DeliveryInput> {
    return await this.deliveryRepository.createDelivery({ client_id, item_name });
  }
}
