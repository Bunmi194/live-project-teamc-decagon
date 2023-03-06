import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

const JWT_SECRET = process.env.JWT_SECRET;

const DB_URI = process.env.DB_URI;

const EMAIL = process.env.EMAIL;

const PASSWORD = process.env.PASSWORD;

const SALT = process.env.SALT;

const URL = process.env.VERIFYURL;

console.log("PORT1: ", PORT);
console.log("ENV: ", PORT, JWT_SECRET, DB_URI, EMAIL, PASSWORD, SALT, URL);
export { PORT, JWT_SECRET, DB_URI, EMAIL, PASSWORD, SALT, URL };