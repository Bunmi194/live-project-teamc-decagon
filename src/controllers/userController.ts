import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { sendMail, sendMailMod } from "../services/emailService";
import { JWT_SECRET, SALT } from "../env";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import {
  doesUserExist,
  writeUserToDatabase,
  updateUserRecordWithEmail,
} from "../services/userService";

export const defaultController = (_req: Request, res: Response) => {
  res.send("Welcome E-move");
};

interface tokenData {
  email: string;
  token?: any;
}

interface UserDataType {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  dateOfBirth?: string;
  gender?: string;
  isVerified?: boolean;
}

const secret = JWT_SECRET as string;

export const signUp = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //no validation errors
  const { firstName, lastName, email, password, dateOfBirth, gender } =
    req.body;
  //check if user exists
  const userExists = await doesUserExist(email);
  if (userExists) {
    return res.status(400).json({ errors: [{ msg: "User already exists" }] });
  }
  const hashedPassword = await bcrypt.hashSync(password, Number(`${SALT}`));
  const newUser = {
    firstName,
    lastName,
    email,
    password: hashedPassword,
    dateOfBirth,
    gender,
    isVerified: false,
  };

  //write the new user to the database
  const User = await writeUserToDatabase(newUser);

  if (!User) {
    return res
      .status(400)
      .json({ errors: [{ msg: "User could not be created" }] });
  }

  //user created successfully
  //send email notification
  try {
    sendMail(email);
    return res.status(201).json({
      User,
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    return res.status(201).json({
      User,
      message: "Email could not be sent",
      success: false,
    });
  }
};

//verify email
export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.params;
  console.log(`Verifying email`);
  console.log(`token: ${token}`);
  const verifyToken = jwt.verify(token, secret) as string;
  console.log(`verifyToken: ${verifyToken}`);
  if (!verifyToken) {
    return res.status(400).json({ message: "Invalid token" });
  }
  const user = (await doesUserExist(verifyToken)) as UserDataType;
  if (!user) {
    return res.status(400).json({ message: "Invalid email address" });
  }
  const newUser = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    dateOfBirth: user.dateOfBirth,
    gender: user.gender,
    isVerified: true,
  };
  const updateUser = updateUserRecordWithEmail(verifyToken, newUser);

  if (!updateUser) {
    //please retry
    return res.status(500).json({ message: "Please try again" });
  }
  return res.status(200).json({ message: "Account verified" });
};


export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await doesUserExist(email);
  if (!user) {
    return res
      .status(400)
      .json({ message: `User with email: ${email} doesn't exist` });
  }
  const messageData = {
    subject: "E-move Reset Password",
    text: `Please click on the link below to reset your password`,
    html: `<b>Please click on the link below to reset your password </b><br/>
        `,
  };
  try {
    sendMailMod(email, messageData);
    return res.status(200).json({
      message: "Reset password email sent",
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Reset password email could not be sent",
      success: false,
    });
  }
};

export const resetpassword = async (req: Request, res: Response) => {
  
  const { password, confirmPassword } = req.body;
  const { token } = req.params;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Password and confirm password are not the same" }); 
  }

  const verifyToken = jwt.verify(token, secret) as string;
  if (!verifyToken) {
    return res.status(400).json({ message: "Invalid token" });
  }
  
    const user = (await doesUserExist(verifyToken)) as UserDataType;
    if (!user) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    const hashedNewPassword = await bcrypt.hashSync(
      password,
      Number(`${SALT}`)
    );

    const newUserInfo = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: hashedNewPassword,
      //password: password,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      isVerified: user.isVerified,
    };

    const updateUser = updateUserRecordWithEmail(verifyToken, newUserInfo);

    if (!updateUser) {
      //please retry
      return res.status(500).json({ message: "Please try again" });
    }
    return res.status(200).json({ message: "Password changed" });
  
};
