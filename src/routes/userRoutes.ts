import { Router } from "express";
import { defaultController, signUp } from "../controllers/userController";


const route = Router();

route.get('/',defaultController);

route.post('/signup',signUp);


export {route}