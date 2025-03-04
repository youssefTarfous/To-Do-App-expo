import { matchedData, validationResult } from "express-validator";
import UserModel from "../Schemas/models/User";
import { generateToken } from "../Utils/GenerateToken";
import { PasswordComparer, PasswordHasher } from "../Utils/Helper";
import { Request, RequestHandler, Response } from "express";



interface AuthRequest extends Request {
  userId?: string;
}
export const loginUser: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
     res.status(400).send({ errors: result.array() });
     return;
  }

  try {
    const body = matchedData(req);
    const { email, password } = body;

    const findUser = await UserModel.findOne({ email });
    if (!findUser) {
      res.status(400).json({ message: "User does not exists" });
      return;
    }
    const comparePassword = await PasswordComparer(password, findUser.password);
    if (!comparePassword) {
      res.status(400).json({ message: "Password does not match" });
      return;
    }
    const token = generateToken(findUser._id);
    res.cookie("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 24 * 60 * 60 * 1000, 
    });

    res.status(200).json({userId: findUser._id,message: "User logged in successfully"});
    return;
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while registering the user" });
    return;
  }
};

export const validateToken = (req: AuthRequest, res:Response) => {
  res.status(200).send({userId:req.userId});
}  
export const logoutUser = (req:Request,res:Response) =>{
  res.cookie("auth-token", "", {expires:new Date(0)}).status(200).send({message:"User logged out successfully"});
}

export const registerUser = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }

  try {
    const body = matchedData(req);
    const { email } = body;

    const findUser = await UserModel.findOne({ email });
    if (findUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    body.password = await PasswordHasher(body.password);
    

    const newUser = new UserModel(body);
    const savedUser = await newUser.save();

    const token = generateToken(savedUser._id);

    res.cookie("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: savedUser });
    return;
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while registering the user" });
    return;
  }
};
