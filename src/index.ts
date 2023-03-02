import {app} from './app';
import { port } from './env';

app.listen(port,()=>{console.log("app is running o port"+ " "+port)})