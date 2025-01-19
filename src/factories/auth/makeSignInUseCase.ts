import { env } from "../../application/config/env";
import { SignInUseCase } from "../../application/useCases/auth/signInUseCase";

export function makeSignInUseCase() {
  return new SignInUseCase(env.jwtSecret);
}
