import { Router } from "express";
import { defaultController, login, signUp , forgotPassword, resetpassword} from "../controllers/userController";
import { signUpAuth, loginAuth, forgotPasswordAuth, resetPasswordAuth, routeAuth, editRouteAuth, adminAuthentication  } from "../middleWares/auth";
import { verifyEmail } from "../controllers/userController";
import { changePassword } from "../controllers/userController";
import { addRoute, editRoute } from "../controllers/routeController";

const route = Router();

route.get("/", defaultController);

route.post("/signup", signUpAuth.body, signUp);

route.post("/login", loginAuth.body, login);

route.get("/verify/:token", verifyEmail);

route.post("/forgotpassword", forgotPasswordAuth.body, forgotPassword)

route.post("/resetpassword/:token", resetPasswordAuth.body, resetpassword);
route.post("/change-password", changePassword);

//routes for bus route
// route.post("/v1/route", routeAuth.body, adminAuthentication, addRoute);
// route.post("/v1/route/edit", editRouteAuth.body, adminAuthentication, editRoute);

export { route };
