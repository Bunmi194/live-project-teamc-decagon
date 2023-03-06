import {app} from './app';
import { PORT } from './env';
import databaseConnection from "./config/config";


databaseConnection();

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
})