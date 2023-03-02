import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;

const jwt_secret = process.env.JWT_SECRET;

export{
port,
jwt_secret
}