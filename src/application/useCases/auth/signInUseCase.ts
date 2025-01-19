import { compare } from "bcryptjs";
import { InvalidCredentials } from "../../errors/auth/InvalidCredentials";
import { prismaClient } from "../../lib/prismaClient";

import { sign } from "jsonwebtoken";

interface IInput {
  email: string;
  password: string;
}

interface IOutput {
  accessToken: string;
}
export class SignInUseCase {
  constructor(private readonly jwtSecret: string) {}
  async execute({ email, password }: IInput): Promise<IOutput> {
    const account = await prismaClient.account.findUnique({
      where: { email: email },
    });

    if (!account) {
      throw new InvalidCredentials();
    }

    const isPasswordValid = await compare(password, account.password);

    if (!isPasswordValid) {
      throw new InvalidCredentials();
    }

    const accessToken = sign({ sub: account.id }, this.jwtSecret, {
      expiresIn: "1d",
    });

    return { accessToken };
  }
}
