import { prisma } from "../../prisma";
import { ClientInput, ClientRepository } from "../client-repository";

export class PrismaClientRepository implements ClientRepository {
  createClient({email, password, name}: ClientInput): Promise<ClientInput> {
    return prisma.clients.create({
      data: {
          email,
          password,
          name,
      },
    });
  }

  deleteClient(id: string): Promise<ClientInput> {
    return prisma.clients.delete({
      where: { id },
    });
  }

  getClientById(id: string): Promise<ClientInput> {
    return prisma.clients.findFirst({
      where: { id },
    });
  }

  getClientByEmail(email: string): Promise<ClientInput> {
    return prisma.clients.findFirst({
      where: { 
        email
      },
    });
  }

  getClients(): Promise<ClientInput[]> {
    return prisma.clients.findMany();
  }

  updateClient(id: string, client: ClientInput): Promise<ClientInput> {
    return prisma.clients.update({
      where: { id: id },
      data: {
        ...client,
        updated_at: new Date(),
      },
    });
  }
}
