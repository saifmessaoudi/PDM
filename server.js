import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import alimentRouter from "./routes/aliment.routes.js";
import repasRouter from "./routes/repas.routes.js";
import cors from "cors";

dotenv.config();

const hostname = process.env.HOSTNAME ;
const port = process.env.PORT ;

const app = express();
connectDB();

app.use(express.json());

app.use(cors());

app.use("/aliments",alimentRouter)
app.use("/repas",repasRouter)
app.use("/admin",adminRouter)
app.use("/auth", authRouter);
app.use("/user", userRouter);

app.listen(port, hostname,() => {
    console.log(`Server running at http://${hostname}:${port}/`);
}
);


