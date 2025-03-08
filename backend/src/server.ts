import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./config/db";
import cookieParser from "cookie-parser";
import userRouter from "./Router/userRouter";
import todoRouter from "./Router/ToDoRouter"; // Ensure correct casing

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ Corrected

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // Fallback if .env is missing
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use("/api/todos", todoRouter);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 5000; // ✅ Ensure a fallback value
app.listen(PORT, () => {
    console.log(`The app is listening on port ${PORT}`);
});
