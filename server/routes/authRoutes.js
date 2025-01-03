import { Router } from "express";
import express  from 'express';
import {Register, Login, Logout, sendVerifyOtp, verifyEmail} from "../controllers/authController.js"
import userAuth from "../middleware/userauth.js";

const authRouter = express.Router();
authRouter.post("/register", Register);
authRouter.post("/login", Login);
authRouter.post("/logout", Logout);
authRouter.post("/send-otp", userAuth, sendVerifyOtp);
authRouter.post("/verify-email", userAuth, verifyEmail);

export default authRouter;