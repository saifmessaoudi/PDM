import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import cors from "cors";
import reclamationRouter  from "./routes/reclamation.routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swaggerDefinition.js";
import passport from "passport";
import "./config/passportConfig.js";
import session from "express-session";


dotenv.config();

const hostname = process.env.HOSTNAME ;
const port = process.env.PORT ;

const app = express();
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));


connectDB();

app.use(express.json());

app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/admin",adminRouter)
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/reclamation",reclamationRouter);

app.listen(port, hostname,() => {
    console.log(`Server running at http://${hostname}:${port}/`);
}
);


