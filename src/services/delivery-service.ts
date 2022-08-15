import { DeliveryInput } from "../repository/deliveries-repository";
import { PrismaDeliveryRepository } from "../repository/prisma/prisma-deliveries-repositories";

export class DeliveryService {
  constructor(private readonly deliveryRepository: PrismaDeliveryRepository) {}

  async create({client_id, item_name}: DeliveryInput): Promise<DeliveryInput> {
    return await this.deliveryRepository.createDelivery({ client_id, item_name });
  }

  async findAllDeliveriesAvailable(): Promise<DeliveryInput[]> {
    return await this.deliveryRepository.findAllDeliveriesAvailable();
  }

  async toAssignDeliveryToDeliveryman({id, deliveryman_id}: DeliveryInput): Promise<DeliveryInput> {
    return await this.deliveryRepository.toAssignDeliveryToDeliveryman({ id, deliveryman_id });
  }

  async findAllDeliveriesByClientId(client_id: string): Promise<DeliveryInput[]> {
    return await this.deliveryRepository.findAllDeliveriesByClientId(client_id);
  }

  async findAllDeliveriesByDeliverymanId(deliveryman_id: string): Promise<DeliveryInput[]> {
    return await this.deliveryRepository.findAllDeliveriesByDeliverymanId(deliveryman_id);
  }

  async updateEndAt({id, deliveryman_id}: DeliveryInput) {
    return await this.deliveryRepository.updateEndAt({ id, deliveryman_id });
  }
}
