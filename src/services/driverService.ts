// import {doesUserExist} from "./userService"

// interface DriverDataType {
//   _id?: string;
//   firstName?: string;
//   lastName?: string;
//   email?: string;
//   password?: string;
//   dateOfBirth?: string;
//   gender?: string;
//   isVerified?: boolean;
//   routeOfOperation?: [];
//   phoneNumber?: string;
//   accountNumber?: string;
//   validID?: string;
//   photo?: string;
// }

// export const doesDriverExist = (email: string) => {
//     return doesUserExist(email)
// };
// //writing driver to database

// export const writeDriverToDatabase = async (driver: {}) => {
//   try {
//     const newDriver = new Driver(driver);
//     await newDriver.save();
//     return newDriver;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// };

// //update driver record

// export const updateDriverRecordWithEmail = async (
//   email: string,
//   driverData: DriverDataType
// ) => {
//   try {
//     const driver = (await doesDriverExist(email)) as DriverDataType;
//     const updatedDriver = await Driver.findByIdAndUpdate(
//       driver._id,
//       driverData,
//       {
//         new: true,
//       }
//     );
//     return updatedDriver;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// };


