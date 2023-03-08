import { Router } from "express";
import { defaultController, forgotPassword, resetpassword, signUp } from "../controllers/userController";
import { forgotPasswordAuth, resetPasswordAuth, signUpAuth } from "../middleWares/auth";
import { verifyEmail } from "../controllers/userController";

const route = Router();

route.get("/", defaultController);

route.post("/v1/signup", signUpAuth.body, signUp);

route.get("/v1/verify/:token", verifyEmail);

route.post("/v1/forgotpassword", forgotPasswordAuth.body, forgotPassword)

route.post("/v1/resetpassword/:token", resetPasswordAuth.body, resetpassword);

export { route };
