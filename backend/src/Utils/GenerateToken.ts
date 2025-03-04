import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";


export const generateToken = (id:ObjectId) => {
    const token: string = jwt.sign({userId: id}, process.env.JWT_SECRET_KEY as string, {expiresIn: "1d"});
    return token
} 

