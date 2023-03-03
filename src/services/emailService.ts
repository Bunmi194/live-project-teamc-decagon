import nodemailer from 'nodemailer';
import jwt from "jsonwebtoken";
import { JWT_SECRET, EMAIL, PASSWORD } from "../env";

const userName = EMAIL || "";
const password = PASSWORD || "";
const secret = JWT_SECRET as string;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: userName,
        pass: password
    }
});

//please use the url for user authentication
//add JWT token
const url = "http://localhost:3030/v1/verify/";


const sendMail = (email: string) =>{

    const token = jwt.sign(email, secret);
    const mailOptions = {
        from: "E-move App",
        to: email,
        subject: "E-move Account Verification",
        text: `Please click on the link below to verify your account`,
        html: `<b>Please click on the link below to verify your account</b><br/>${url}${token}
        `
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent:'+ info.response);
        }
    })
}

export default sendMail;