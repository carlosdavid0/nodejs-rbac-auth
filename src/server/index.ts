import express from "express";

import { makeSignInController } from "../factories/auth/makeSignInController";
import { makeSignUpController } from "../factories/auth/makeSignUpController";
import { routeAdapter } from "./adapter/routeAdapter";

const app = express();

app.use(express.json());

app.post("/sign-up", routeAdapter(makeSignUpController()));
app.post("/sign-in", routeAdapter(makeSignInController()));

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
