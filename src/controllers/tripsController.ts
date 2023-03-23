import { Request, Response } from "express";
import { JWT_SECRET } from "../env";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  getAllTripsForAdmin,
  getAllTripsForPassenger,
} from "../services/tripServices";
import { doesUserExist } from "../services/userService";

interface UserDataType {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  dateOfBirth?: string;
  gender?: string;
  roles?: string[];
  driverStatus?: string;
  isVerified?: boolean;
  routeOfOperation?: [];
  phoneNumber?: string;
  accountNumber?: string;
  validID?: string;
  photo?: string;
}

export interface NewRequest extends Request {
  user?: UserDataType;
}

export interface JwtResult extends JwtPayload {
  id?: string;
}
export const getTripsController = async (req: NewRequest, res: Response) => {
  //authenticate user

  const { authorization } = req.headers;
  let token;
  authorization ? (token = authorization.split(" ")[1]) : (token = undefined);

  jwt.verify(`${token}`, `${JWT_SECRET}`, async (err, result: any) => {
    if (err) {
      return res.status(400).json({
        message: "Bad request",
        data: err,
      });
    }
    const id = result?.id;
    if (!id) {
      return res.status(400).json({
        message: "Bad request",
      });
    }
    const userDetails = (await doesUserExist({ id: id })) as UserDataType;

    if (userDetails && userDetails.roles?.includes("admin")) {
      const tripCollections = await getAllTripsForAdmin();
      return res.status(200).json({
        message: "success",
        data: tripCollections,
      });
    }
    if (userDetails && userDetails.roles?.includes("passenger")) {
      const tripCollection = await getAllTripsForPassenger(id);
      console.log("tripCollection", tripCollection);
      return res.status(200).json({
        message: "success",
        data: tripCollection,
      });
    }
    return res.status(500).json({
      message: "Internal Server Error",
    });
  });
};
