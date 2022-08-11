export interface ClientInput {
  name: string;
  email: string;
  password: string;
}

export interface ClientRepository {
  createClient(client: ClientInput): Promise<ClientInput>;
  getClient(id: string): Promise<ClientInput | Error | null >;
  getClients(): Promise<ClientInput[]>;
  updateClient(id: string,client: ClientInput): Promise<ClientInput>;
  deleteClient(id: string): Promise<ClientInput>;
}