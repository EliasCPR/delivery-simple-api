export interface DeliveryInput {
  id?: string;
  item_name: string;
  client_id: string;
  deliveryman_id?: string;
  created_at?: Date;
  end_at?: Date;
}

export interface DeliveryRepository {
  createDelivery(delivery: DeliveryInput): Promise<DeliveryInput>;
  getDeliveryById(id: string): Promise<DeliveryInput>;
}
