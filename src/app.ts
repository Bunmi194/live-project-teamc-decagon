import express from 'express';
import { route  as userRouter } from './routes/userRoutes';
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// const secret = process.env.SESSION_SECRET || "";
app.use(cors({
    origin: '*',
}))
app.use(morgan('combined'));


app.use("/", userRouter);

export { app };