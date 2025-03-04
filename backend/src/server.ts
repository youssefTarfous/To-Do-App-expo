import express, { urlencoded } from "express"
import cors from "cors"
import dotenv from "dotenv";
import "./config/db"
// import userRouter from "./routes/userRouter";
// import authRouter from "./routes/authRouter";
import cookieParser from "cookie-parser"
dotenv.config();

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))


// app.use("/api/users", userRouter)
// app.use("/api/auth", authRouter)

app.listen(process.env.PORT, () => {
    console.log(`The app is listening on port ${process.env.PORT}`)
})