import express from 'express';
import { route  as userRouter} from './routes/userRoutes';

const app = express();

app.use('/v1/user', userRouter);

export { app };