import { Router } from "express";
import { defaultController, login, signUp , forgotPassword, resetpassword} from "../controllers/userController";
import { signUpAuth, loginAuth, forgotPasswordAuth, resetPasswordAuth  } from "../middleWares/auth";
import { verifyEmail } from "../controllers/userController";
import { changePassword } from "../controllers/userController";

const route = Router();

route.get("/", defaultController);

route.post("/v1/signup", signUpAuth.body, signUp);

route.post("/v1/login", loginAuth.body, login);

route.get("/v1/verify/:token", verifyEmail);

route.post("/v1/forgotpassword", forgotPasswordAuth.body, forgotPassword)

route.post("/v1/resetpassword/:token", resetPasswordAuth.body, resetpassword);
route.post("/v1/change-password", changePassword);

export { route };
