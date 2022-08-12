export interface DeliverymanInput {
  id?: string;
  name?: string;
  email: string;
  password: string;
}

export interface DeliverymanRepository {
  createDeliveryman(deliveryman: DeliverymanInput): Promise<DeliverymanInput>;
  getDeliverymanById(id: string): Promise<DeliverymanInput>;
  getDeliverymanByEmail(email: string): Promise<DeliverymanInput>;
  getDeliverymen(): Promise<DeliverymanInput[]>;
  updateDeliveryman(
    id: string,
    deliveryman: DeliverymanInput
  ): Promise<DeliverymanInput>;
  deleteDeliveryman(id: string): Promise<DeliverymanInput>;
}
