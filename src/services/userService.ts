import User from "../models/userModel";

interface UserDataType {
  _id?: string;
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  dateOfBirth?: string;
  gender?: string;
  isVerified?: boolean;
  roles?: [string];
}

export const doesUserExist = async (email: string) => {
  // return new Promise((resolve) => {
  //   const user = User.findOne({ email: email }) as UserDataType;
  //   resolve(user);
  // });
  return User.findOne({ email: email })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log("Error: ", err);
      return false;
    });
};
//pass object to this function to find user
export const findAnyUser = async (data: UserDataType) => {
  return User.findOne(data)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log("Error: ", err);
      return false;
    });
};
//writing user to database

export const writeUserToDatabase = async (user: {}) => {
  // try {
  //   const newUser = new User(user);
  //   await newUser.save();
  //   return newUser;
  // } catch (error) {
  //   console.log(error);
  //   return false;
  // }
  const newUser = new User(user);
  return newUser
    .save()
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log("Error: ", err);
      return false;
    });
};

//update user record

export const updateUserRecordWithEmail = async (
  email: string,
  userData: UserDataType
) => {
  try {
    const user = (await doesUserExist(email)) as unknown as UserDataType;
    const updatedUser = await User.findByIdAndUpdate(user._id, userData, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getAllUsers = async () => {
  const users = await User.find();
  return users;
};
