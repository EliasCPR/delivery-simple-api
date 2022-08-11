import { prisma } from "../../prisma";
import { ClientInput, ClientRepository } from "../client-repository";

export class PrismaClientRepository implements ClientRepository {
  createClient(client: ClientInput): Promise<ClientInput> {
    return prisma.clients.create({
      data: {
        ...client,
      },
    });
  }

  deleteClient(id: string): Promise<ClientInput> {
    return prisma.clients.delete({
      where: { id },
    });
  }

  getClient(id: string): Promise<ClientInput | Error | null> {
    return prisma.clients.findFirst({
      where: { id },
    });
  }

  getClients(): Promise<ClientInput[]> {
    return prisma.clients.findMany();
  }

  updateClient(id: string,client: ClientInput): Promise<ClientInput> {
    return prisma.clients.update({
      where: { id: id },
      data: {
        ...client,
        updated_at: new Date(),
      },
    });
  }
}
