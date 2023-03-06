import User from "../models/userModel";

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

export const doesUserExist = (email: string) => {
  return new Promise((resolve) => {
    const user = User.findOne({ email: email }) as UserDataType;
    resolve(user);
  });
};
//writing user to database

export const writeUserToDatabase = async (user: {}) => {
  try {
    const newUser = new User(user);
    await newUser.save();
    return newUser;
  } catch (error) {
    console.log(error);
    return false;
  }
};

//update user record

export const updateUserRecordWithEmail = async (
  email: string,
  userData: UserDataType
) => {
  try {
    const user = (await doesUserExist(email)) as UserDataType;
    const updatedUser = await User.findByIdAndUpdate(user._id, userData, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
};
