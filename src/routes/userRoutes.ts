import { Router } from "express";
import { defaultController, login, signUp , forgotPassword, resetpassword, addDriver, editDriver, deleteDriverController, fundWalletController, payStackCallback} from "../controllers/userController";
import { signUpAuth, loginAuth, forgotPasswordAuth, resetPasswordAuth, addDriverValidator, routeAuth, editRouteAuth, adminAuthentication  } from "../middleWares/auth";
import { verifyEmail } from "../controllers/userController";
import { Upload } from "../middleWares/imageUpload";
import { changePassword , getAllDriversController, getOneDriverController} from "../controllers/userController";
import { addRoute, editRoute } from "../controllers/routeController";

const route = Router();

route.get("/", defaultController);

route.post("/signup", signUpAuth.body, signUp);

route.post("/login", loginAuth.body, login);

route.get("/verify/:token", verifyEmail);

route.post("/forgotpassword", forgotPasswordAuth.body, forgotPassword)

route.post("/resetpassword/:token", resetPasswordAuth.body, resetpassword);
route.post("/change-password", changePassword);

route.get('/drivers', getAllDriversController)
route.get('/driver/:id', getOneDriverController)
route.delete('/deleteDriver/:id', deleteDriverController)

route.post("/v1/add-driver/:token",  addDriver )
route.post("/v1/edit-driver/:id", editDriver)

route.post("/paystack/pay", fundWalletController)
route.get("/paystack/callback", payStackCallback)

//router.post("/", , Upload, createMemory);

export { route };
