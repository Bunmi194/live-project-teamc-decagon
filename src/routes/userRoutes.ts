import { Router } from "express";
import { defaultController, login, signUp , forgotPassword, resetpassword, addDriver, editDriver} from "../controllers/userController";
import { signUpAuth, loginAuth, forgotPasswordAuth, resetPasswordAuth, addDriverValidator  } from "../middleWares/auth";
import { verifyEmail } from "../controllers/userController";
import { changePassword } from "../controllers/userController";
import { Upload } from "../middleWares/imageUpload";

const route = Router();

route.get("/", defaultController);

route.post("/v1/signup", signUpAuth.body, signUp);

route.post("/v1/login", loginAuth.body, login);

route.get("/v1/verify/:token", verifyEmail);

route.post("/v1/forgotpassword", forgotPasswordAuth.body, forgotPassword)

route.post("/v1/resetpassword/:token", resetPasswordAuth.body, resetpassword);
route.post("/v1/change-password", changePassword);

route.post("/v1/add-driver/:token",  addDriver )
route.post("/v1/edit-driver/:id",  editDriver )

//router.post("/", , Upload, createMemory);

export { route };
