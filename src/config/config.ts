import mongoose from "mongoose";
import { DB_URI } from "../env";
import jwt from "jsonwebtoken";

// const data = {
//   id: "641089cdaabccc858abf551b"
// }
// const token = jwt.sign(data, "$2b$10$jkTyLUfdeZ3xb9gI0HWaw.o2ZYHcPCfEM24sTdkTyt3tEc2uTrrcy")
// console.log("TOKEN: ", token)


const databaseConnection = () => {
  mongoose
    .connect(`${DB_URI}`)
    .then(() => {
      console.log(`Database connection established`);
    })
    .catch((err) => {
      setTimeout(databaseConnection, 30000);
      console.log("Could not connect to database: ", err);
    });

  mongoose.connection.on("connection", (connection: mongoose.Connection) => {
    console.log("Mongoose default connection open to" + connection.host);
  });
};

export default databaseConnection;
