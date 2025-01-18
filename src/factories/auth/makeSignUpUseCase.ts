import { SignUpUseCase } from "../../application/useCases/auth/signUpUseCase";

export function makeSignUpUseCase() {
  const salt = 10;
  return new SignUpUseCase(salt);
}
