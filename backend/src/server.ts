import express, { urlencoded } from "express"
import cors from "cors"
import dotenv from "dotenv";
import "./config/db"
import cookieParser from "cookie-parser"
import userRouter from "./Router/userRouter";
import todoRouter from "./Router/ToDoRouter";
dotenv.config();

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods:["GET","POST","PUT","DELETE"]
}))


app.use("/api/todos", todoRouter)
app.use("/api/user", userRouter)

app.listen(process.env.PORT, () => {
    console.log(`The app is listening on port ${process.env.PORT}`)
})