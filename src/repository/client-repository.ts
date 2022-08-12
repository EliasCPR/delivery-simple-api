export interface ClientInput {
  id?: string;
  name?: string;
  email: string;
  password: string;
}

export interface ClientRepository {
  createClient(client: ClientInput): Promise<ClientInput>;
  getClientById(id: string): Promise<ClientInput>;
  getClientByEmail(email: string): Promise<ClientInput>;
  getClients(): Promise<ClientInput[]>;
  updateClient(id: string,client: ClientInput): Promise<ClientInput>;
  deleteClient(id: string): Promise<ClientInput>;
}