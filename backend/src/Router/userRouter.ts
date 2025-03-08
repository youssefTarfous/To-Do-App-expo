import { Router } from "express";
import { checkSchema } from "express-validator";
import { userSchema } from "../Schemas/Validation/UserSchema";
import { loginSchema } from "../Schemas/Validation/loginSchema";
import { loginUser, logoutUser, registerUser } from "../controllers/UserController";

const userRouter = Router();

userRouter.post("/login", checkSchema(loginSchema),loginUser);//checked
userRouter.post("/register", checkSchema(userSchema), registerUser);//checked
userRouter.post("/logout", logoutUser);//checked



export default userRouter
