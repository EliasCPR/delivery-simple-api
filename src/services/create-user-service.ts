import { PrismaClientRepository } from "../repository/prisma/prisma-client-repository";
import { ClientInput } from "../repository/client-repository";

export class ClientService {
  constructor(private readonly clientRepository: PrismaClientRepository) {}

  async create(request: ClientInput) {
    const { email, name, password } = request;

    if (!email) {
      throw new Error("Email is required");
    }

    if (!name) {
      throw new Error("Name is required");
    }

    if (!password) {
      throw new Error("Password is required");
    }

    return await this.clientRepository.createClient({email, name, password});
  }

  async list() {
    return await this.clientRepository.getClients();
  }
}
