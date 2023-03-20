import { Router } from "express";
import { verifyDriverController, rejectDriverController , getPendingUsersController} from "../controllers/adminController";
import { verifyDriverValidator  } from "../middleWares/auth";



const route = Router();

route.get("/verifyDriver/:passengerID", verifyDriverValidator.params, verifyDriverController);
route.get("/rejectDriver/:passengerID", verifyDriverValidator.params, rejectDriverController);

route.get("/getPendingUsers", getPendingUsersController)

//router.post("/", , Upload, createMemory);

export { route };
