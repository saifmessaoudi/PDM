import { Router } from "express";
import authcontroller  from "../controllers/auth.controller.js";
import authenticated from "../middlewares/authenticated.middleware.js";
import validatorMiddleware from "../middlewares/validator.middleware.js";
import userSignupValidator from "../validators/auth.user.validator.js";


const authRouter = Router();

authRouter.post("/signup", validatorMiddleware(userSignupValidator), authcontroller.signUp);
authRouter.post("/signin", authcontroller.signIn);
authRouter.post("/forgot-password", authcontroller.forgotPassword);
authRouter.post("/send-email-verification",authenticated ,authcontroller.resendEmailVerification);
authRouter.get("/verify-email/:token",authenticated, authcontroller.verifEmail);


export default authRouter;