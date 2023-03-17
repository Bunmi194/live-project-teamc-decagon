import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { sendMail } from "../services/emailService";
import { JWT_SECRET, SALT, EMAIL, PASSWORD, VERIFYURL, RESETURL } from "../env";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel";
import cloudUpload from "../utils/cloudinary";

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
  roles?: string[];
  driverStatus?: string;
  isVerified?: boolean;
  routeOfOperation?: [];
  phoneNumber?: string;
  accountNumber?: string;
  validID?: string;
  photo?: string;
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
  const userExists = await doesUserExist({ email });
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

  const token = jwt.sign(email, secret);
  const messageData = {
    from: "E-move App",
    to: email,
    subject: "E-move Account Verification",
    text: `Please click on the link below to verify your account`,
    html: `<b>Please click on the link below to verify your account</b><br/>${VERIFYURL}${token}
        `,
  };

  //user created successfully
  //send email notification
  try {
    sendMail(email, messageData);
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
  const user = (await doesUserExist({ email: verifyToken })) as UserDataType;
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

  //change password
  //change password
};
export const changePassword = async (req: Request, res: Response) => {
  try {
    //get password from request body
    const { password, newPassword, confirmPassword } = req.body;
    //hashed password
    const hashedPassword = await bcrypt.hashSync(
      newPassword,
      Number(`${SALT}`)
    );
    //check if user exists
    const userExists = (await doesUserExist({
      email: req.body.email,
    })) as UserDataType;
    if (!userExists) {
      return res.status(400).json({ errors: [{ msg: "User does not exist" }] });
    }

    //check if password is correct
    // const isPasswordCorrect = bcrypt.compareSync(
    //   password,
    //   userExists.password!
    // );
    //console.log("what is happening");
    if (password !== userExists.password) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Old password is incorrect" }] });
    }
    //check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Passwords do not match" }] });
    }
    const newUser = {
      _id: userExists._id,
      firstName: userExists.firstName,
      lastName: userExists.lastName,
      email: userExists.email,
      password: hashedPassword,
      dateOfBirth: userExists.dateOfBirth,
      gender: userExists.gender,
      isVerified: userExists.isVerified,
    };

    const updateUser = updateUserRecordWithEmail(userExists.email!, newUser);
    if (!updateUser) {
      //please retry
      return res.status(500).json({ message: "Please try again" });
    }
    return res.status(200).json({ message: "Password changed" });
  } catch (error) {
    return res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = (await doesUserExist({ email })) as UserDataType;
  if (!user) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  const isMatch = bcrypt.compareSync(password, user.password!);
  console.log(isMatch);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }
  if (!user.isVerified) {
    return res.status(400).json({ message: "Please verify your email" });
  }
  const token = jwt.sign({ email: user.email }, secret, { expiresIn: "1h" });
  return res.status(200).json({ token });
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await doesUserExist({ email });
  if (!user) {
    return res
      .status(400)
      .json({ message: `User with email: ${email} doesn't exist` });
  }
  const token = jwt.sign(email, secret);
  const messageData = {
    subject: "E-move Reset Password",
    text: `Please click on the link below to reset your password`,
    html: `<b>Please click on the link below to reset your password </b><br/>
        ${RESETURL}${token}`,
  };
  try {
    sendMail(email, messageData);
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
    return res
      .status(400)
      .json({ message: "Password and confirm password are not the same" });
  }

  const verifyToken = jwt.verify(token, secret) as string;
  if (!verifyToken) {
    return res.status(400).json({ message: "Invalid token" });
  }

  const user = (await doesUserExist({ email: verifyToken })) as UserDataType;
  if (!user) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  const hashedNewPassword = await bcrypt.hashSync(password, Number(`${SALT}`));

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

export async function addDriver(req: Request, res: Response) {
  const { phoneNumber, accountNumber, validID, photo } = req.body;
  let cloudImagePhoto: any;
  let cloudImageValidID: any;
  //const photo = req.file?.path;

  console.log(req.body);
  const { token } = req.params;
  const verifyToken = jwt.verify(token, secret) as string;
  if (!verifyToken) {
    return res.status(400).json({ message: "Cannot make edit" });
  }

  const user = (await doesUserExist({ email: verifyToken })) as UserDataType;
  if (!user) {
    return res.status(400).json({ message: "Cannot make edit" });
  }

  if (user.roles?.includes("driver")) {
    return res.status(400).json({ message: "Already a driver" });
  }

  if (user.driverStatus == "verified" || user.driverStatus == "pending") {
    return res
      .status(400)
      .json({ message: "Cannot make request at this moment" });
  }

  if (
    (!photo && !validID && !phoneNumber) ||
    (!user.photo && !user.validID && !user.phoneNumber)
  ) {
    return res
      .status(400)
      .json({ message: "All fields are required to be a driver" });
  }

  cloudImagePhoto = await cloudUpload.uploader.upload(photo!, {
    folder: "emove/photos",
  });

  cloudImageValidID = await cloudUpload.uploader.upload(validID, {
    folder: "emove/validID",
  });

  const updatedUserInfo = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    dateOfBirth: user.dateOfBirth,
    gender: user.gender,
    isVerified: user.isVerified,
    phoneNumber,
    accountNumber,
    driverStatus: "pending",
    photo: {
      public_id: cloudImagePhoto!.public_id,
      url: cloudImagePhoto.secure_url,
    },

    validID: {
      public_id: cloudImageValidID.public_id,
      url: cloudImageValidID.secure_url,
    },
  };

  const updateUser = updateUserRecordWithEmail(verifyToken, updatedUserInfo);

  if (!updateUser) {
    //please retry
    return res.status(500).json({ message: "Please try again" });
  }
  return res.status(200).json({ message: "Request to be a driver in review" });
}

export async function editDriver(req: Request, res: Response) {
  const { id } = req.params;
  const { routeOfOperation, accountNumber, photo, validID } = req.body;
  let cloudImagePhoto: any;
  let cloudImageValidID: any;

  const user = (await doesUserExist({ id })) as UserDataType;

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  if (!user.roles?.includes("driver")) {
    return res.status(400).json({ message: "Not a" });
  }

  if (photo) {
    cloudImagePhoto = await cloudUpload.uploader.upload(photo!, {
    folder: "emove/photos",
  });
  }
 
  if (validID) {
    cloudImageValidID = await cloudUpload.uploader.upload(validID, {
      folder: "emove/validID",
    });
  
}

  const updatedUserInfo = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    dateOfBirth: user.dateOfBirth,
    gender: user.gender,
    isVerified: user.isVerified,
    phoneNumber: user.phoneNumber,
    accountNumber: !accountNumber ? user.accountNumber : accountNumber,
    driverStatus: user.driverStatus,
    photo: !photo
      ? user.photo
      : {
          public_id: cloudImagePhoto!.public_id,
          url: cloudImagePhoto.secure_url,
        },
    validID: !validID
      ? user.validID
      : {
          public_id: cloudImageValidID.public_id,
          url: cloudImageValidID.secure_url,
        },
  };

  const updateUser = updateUserRecordWithEmail(user.email!, updatedUserInfo);

  if (!updateUser) {
    //please retry
    return res.status(500).json({ message: "Please try again" });
  }
  return res
    .status(200)
    .json({ message: "Update successful", data: updateUser });
}
