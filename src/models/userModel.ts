import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    firstName: { 
        type: "string",
        required: true
    },
    lastName: { 
        type: "string",
        required: true
    },
    email: { 
        type: "string",
        required: true
    },
    password: { 
        type: "string",
        required: true
    },
    dateOfBirth: { 
        type: "string",
        required: true
    },
    gender: { 
        type: "string",
        required: true
    },
    isVerified: {
        type: "boolean",
        required: true
    }
    
});

const User = mongoose.model("User", userSchema);

export default User;