import { SignInUseCase } from "../../application/useCases/auth/signInUseCase";

export function makeSignInUseCase() {
  return new SignInUseCase();
}
