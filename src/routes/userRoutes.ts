import { Router } from "express";
import { defaultController, signUp } from "../controllers/userController";
import { signUpAuth } from "../middleWares/auth";
import { verifyEmail } from "../controllers/userController";

const route = Router();

route.get("/", defaultController);

route.post("/v1/signup", signUpAuth.body, signUp);

route.get("/v1/verify/:token", verifyEmail);

export { route };
