import express, { urlencoded } from "express"
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./database/db.js";
import userRoute from './routes/user.routes.js'
import expenseRoute from './routes/expense.route.js'
dotenv.config({});
const app=express();
const port=7070;
//middleware
app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cookieParser());
const corsOption={
    origin:process.env.FORNTEND_URI,
    credentials: true,
}
app.use(cors(corsOption))


//api's
app.use("/api/v1/user",userRoute)
app.use("/api/v1/expense",expenseRoute)

app.listen(port,()=>{
    connectDB();
    console.log(`server is listen at port ${port}`)
})
