import mongoose from "mongoose";
import { app } from "../app";
import { DB_URI } from "../env";

const connectionString = DB_URI || "";
const PORT = process.env.PORT || 3030;

const databaseConnection = () => {
    mongoose.connect(connectionString)
    .then(() => {       
        console.log(`Database connection established`);
    })
    .catch(() => {
        console.log("Could not connect to database");
    });

    mongoose.connection.on('connection', (connection: mongoose.Connection) => {
        console.log('Mongoose default connection open to'+ connection.host);
    })
}

export default databaseConnection;
