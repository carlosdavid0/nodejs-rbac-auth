import { hash } from "bcryptjs";
import { AlreadyExistsError } from "../../errors/auth/accountAlreadyExists";
import { prismaClient } from "../../lib/prismaClient";

interface IInput {
  name: string;
  email: string;
  password: string;
}

type IOutput = void;

export class SignUpUseCase {
  constructor(private readonly salt: number) {}

  async execute({ email, name, password }: IInput): Promise<IOutput> {
    const emailAlreadyExists = await prismaClient.account.findUnique({
      where: { email: email },
    });

    if (emailAlreadyExists) {
      throw new AlreadyExistsError();
    }

    const hashedPassword = await hash(password, this.salt);

    await prismaClient.account.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
  }
}
