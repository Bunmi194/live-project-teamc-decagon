import express from "express";
import { routeAuth, editRouteAuth } from "../middleWares/auth";
import { addRoute, editRoute } from "../controllers/routeController";
import { adminAuthentication } from "../middleWares/auth";

const route = express.Router();

//add authentication middleware
route.post("/v1/route", routeAuth.body, adminAuthentication, addRoute);
route.post("/v1/route/edit", editRouteAuth.body, adminAuthentication, editRoute);

export { route }