import { Router } from "express";
import { verifyDriverController, rejectDriverController , getPendingUsersController} from "../controllers/adminController";
import { verifyDriverValidator  } from "../middleWares/auth";



const route = Router();

route.get("/v1/verifyDriver/:passengerID", verifyDriverValidator.params, verifyDriverController);
route.get("/v1/rejectDriver/:passengerID", verifyDriverValidator.params, rejectDriverController);

route.get("/v1/getPendingUsers", getPendingUsersController)

//router.post("/", , Upload, createMemory);

export { route };
