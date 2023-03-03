// import dotenv from 'dotenv';
import { request } from 'express';
// dotenv.config();

const PORT = process.env.PORT || 3030;

const JWT_SECRET = process.env.JWT_SECRET || "$2b$10$jkTyLUfdeZ3xb9gI0HWaw.o2ZYHcPCfEM24sTdkTyt3tEc2uTrrcy";

const DB_URI = process.env.DB_URI || "mongodb+srv://emove:Emove123456789$$@emove.zjqzcfx.mongodb.net/?retryWrites=true&w=majority";

const EMAIL = process.env.EMAIL || "emove.teamc@gmail.com";

const PASSWORD = process.env.PASSWORD || "zooexyymyasruxbx";

// console.log('Here: ', DB_URI)
// console.log('EMAIL: ', EMAIL)
export{
    PORT,
    JWT_SECRET,
    DB_URI,
    EMAIL,
    PASSWORD
}