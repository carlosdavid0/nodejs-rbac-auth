import { z, ZodError } from "zod";
import { InvalidCredentials } from "../../errors/auth/InvalidCredentials";
import { IController, IRequest, IResponse } from "../../interfaces/IController";
import { SignInUseCase } from "../../useCases/auth/signInUseCase";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export class SignInController implements IController {
  constructor(private readonly signInUseCase: SignInUseCase) {}
  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { email, password } = schema.parse(body);

      const { accessToken } = await this.signInUseCase.execute({
        email,
        password,
      });

      return {
        statusCode: 200,
        body: { accessToken },
      };
    } catch (err) {
      if (err instanceof ZodError) {
        return {
          statusCode: 400,
          body: {
            error: err.issues,
          },
        };
      }

      if (err instanceof InvalidCredentials) {
        return {
          statusCode: 401,
          body: {
            error: "Invalid credentials",
          },
        };
      }

      throw err;
    }
  }
}
