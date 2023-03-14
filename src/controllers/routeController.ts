import { Request, Response } from "express";
import { routeExists, createRoute, updateRoute } from "../services/routeService";

interface routeDataType{
    id?: string;
    pickUpStation?: string;
    destination?: string;
    price?: number;
}

export const addRoute = async (req: Request, res: Response) => {
    //take the data
    const { pickUpStation, destination, price } = req.body;
    const routeDetails = {
        pickUpStation,
        destination
    };
    const doesRouteExists = (await routeExists(routeDetails)) as unknown as Array<routeDataType>;
    console.log("doesRouteExists: ", doesRouteExists)
    if (doesRouteExists.length !== 0) {
        return res.status(400).json({
            message: "Route already exists"
        });
    }
    const newRoute = await createRoute({...routeDetails, price});
    if(!newRoute) {
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
    return res.status(201).json({
        message: "Route created successfully",
        route: newRoute
    });
}

export const editRoute = async (req: Request, res: Response) => {
    //get route id
    // const { routeId } = req.headers;
    const { price, id } = req.body;
    //check if route exists
    const doesRouteExist = await routeExists({_id: id});
    if (!doesRouteExist) {
        return res.status(404).json({
            message: "Route does not exist"
        });
    }
    //fetch route details
    const newRouteID = id as string;
    //update route details
    const routeDetails = {
        price: price,
        id: id
    }
    const updateRouteDetails = await updateRoute(routeDetails);
    console.log("updateRouteDetails: ", updateRouteDetails)
    if(!updateRouteDetails) {
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
    return res.status(200).json({
        message: "Route updated successfully",
        route: updateRouteDetails
    });
}