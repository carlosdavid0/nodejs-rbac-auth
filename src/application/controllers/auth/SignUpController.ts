import { z, ZodError } from "zod";
import { AlreadyExistsError } from "../../errors/auth/accountAlreadyExists";
import { IController, IRequest, IResponse } from "../../interfaces/IController";
import { SignUpUseCase } from "../../useCases/auth/signUpUseCase";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export class SignUpController implements IController {
  constructor(private readonly SignUpUseCase: SignUpUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { email, name, password } = schema.parse(body);

      await this.SignUpUseCase.execute({ email, name, password });

      return {
        statusCode: 204,
        body: null,
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

      if (err instanceof AlreadyExistsError) {
        return {
          statusCode: 409,
          body: {
            error: "This email is already in use",
          },
        };
      }

      throw err;
    }
  }
}
