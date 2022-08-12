import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { DeliverymanInput } from "../repository/deliveryman-repository";
import { PrismaDeliverymanRepository } from "../repository/prisma/prisma-deliveryman-repository";
import { ClientException } from "../utils/error/exception";

export class DeliverymanService {
  constructor(
    private readonly deliverymanRepository: PrismaDeliverymanRepository
  ) {}

  async create({ email, name, password }: DeliverymanInput) {
    const deliverymanExists =
      await this.deliverymanRepository.getDeliverymanByEmail(email);

    if (deliverymanExists) {
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

    return await this.deliverymanRepository.createDeliveryman({
      email,
      name,
      password: hashedPassword,
    });
  }

  async list() {
    return await this.deliverymanRepository.getDeliverymen();
  }

  async authenticate({ email, password }: DeliverymanInput) {
    const deliverymanExists =
      await this.deliverymanRepository.getDeliverymanByEmail(email);

    if (!deliverymanExists) {
      throw new ClientException("email and/or password invalid", 400);
    }

    const passwordMatch = await compare(password, deliverymanExists.password);

    if (!passwordMatch) {
      throw new ClientException("email and/or password invalid", 400);
    }

    const token = sign(deliverymanExists, "secret0", {
      expiresIn: "1h",
      subject: deliverymanExists.id,
    });

    return { token };
  }
}
