import express from "express";

import { makeSignInController } from "../factories/auth/makeSignInController";
import { makeSignUpController } from "../factories/auth/makeSignUpController";

const app = express();

app.use(express.json());

app.post("/sign-up", async (request, response) => {
  const signUpController = makeSignUpController();

  const { body, statusCode } = await signUpController.handle({
    body: request.body,
  });

  response.status(statusCode).json(body);
});
app.post("/sign-in", async (request, response) => {
  const signInController = makeSignInController();

  const { body, statusCode } = await signInController.handle({
    body: request.body,
  });

  response.status(statusCode).json(body);
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
