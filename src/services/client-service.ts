import { PrismaClientRepository } from "../repository/prisma/prisma-client-repository";
import { ClientInput } from "../repository/client-repository";
import { compare, hash } from "bcrypt";
import { ClientException } from "../utils/error/exception";
import { sign } from "jsonwebtoken";

export class ClientService {
  constructor(private readonly clientRepository: PrismaClientRepository) {}

  async create({ email, name, password }: ClientInput) {
    const clientExists = await this.clientRepository.getClientByEmail(email);
    console.log(clientExists);

    if (clientExists) {
      throw new ClientException("Client already exists", 400);
    }

    if (!email) {
      throw new ClientException("Email is required", 400);
    }

    if (!name) {
      throw new ClientException("Name is required", 400);
    }

    if (!password) {
      throw new ClientException("Password is required", 400);
    }

    const hashedPassword = await hash(password, 10);

    return await this.clientRepository.createClient({
      email,
      name,
      password: hashedPassword,
    });
  }

  async list() {
    return await this.clientRepository.getClients();
  }

  async authenticate({email, password}: ClientInput) {

    const clientExists = await this.clientRepository.getClientByEmail(email);

    if (!clientExists) {
      throw new ClientException("email and/or password invalid", 400);
    }

    const passwordMatch = await compare(password, clientExists.password);

    if (!passwordMatch) {
      throw new ClientException("email and/or password invalid", 400);
    }
    
    const token = sign(clientExists, 'secret', {expiresIn: '1h', subject: clientExists.id});

    return {token}; 
  }
}
