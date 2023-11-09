import  express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"

import userRoutes from "./routes/user.js"


const app = express()
dotenv.config()

app.use(express.json())


const connect = ()=>{
    mongoose.connect(process.env.mongo).then(()=>{
        console.log("Connected to DB")
    }).catch((error)=>{
        console.log(error)
    })
}

app.use("/user", userRoutes)

app.listen(process.env.port, ()=>{
    console.log("Server Started on Port", process.env.port)
    connect()
})