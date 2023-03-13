import express from 'express';
import { route  as userRouter } from './routes/userRoutes';
// import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

//import databaseConnection from "./config/config";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: '*',
}))
app.use(morgan('combined'));

//databaseConnection();

app.use("/", userRouter);

export { app };