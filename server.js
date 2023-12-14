import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import  exercicesrouter from "./routes/exercices.routes.js"
import  coursrouter from "./routes/cours.routes.js"



import cors from "cors";
dotenv.config();

const hostname = process.env.HOSTNAME ;
const port = process.env.PORT ;

const app = express();
connectDB();

app.use(express.json());

app.use(cors());

app.use("/admin",adminRouter)
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/exercice", exercicesrouter)
app.use("/cours", coursrouter)




app.listen(port,() => {
    console.log(`Server running at http://${hostname}:${port}/`);
}
);
