import { Router } from "express";
import authcontroller  from "../controllers/auth.controller.js";
import authenticated from "../middlewares/authenticated.middleware.js";
import validatorMiddleware from "../middlewares/validator.middleware.js";
import userSignupValidator from "../validators/auth.user.validator.js";
import passport from "passport";
import jwt from "jsonwebtoken";


const authRouter = Router();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Registration
 *     description: Register a new user 
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *
 *             required:
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User Created Successfully
 *       400:
 *         description: Unauthorized, incorrect credentials
 */
authRouter.post("/signup", validatorMiddleware(userSignupValidator), authcontroller.signUp);

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Authentication
 *     description: Sign in with user credentials (email & password) and receive an access token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User signed in successfully
 *       400:
 *         description: Unauthorized, incorrect credentials
 */
authRouter.post("/signin", authcontroller.signIn);
authRouter.post("/forgot-password", authcontroller.forgotPassword);
authRouter.post("/send-email-verification",authenticated ,authcontroller.resendEmailVerification);
authRouter.get("/verify-email/:token",authenticated, authcontroller.verifEmail);

authRouter.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
)

authRouter.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/auth/signin" }),
    authcontroller.signInWithGoogle
);



export default authRouter;