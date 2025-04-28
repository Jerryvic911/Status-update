import express  from 'express';
import {Register, Login, Logout, sendVerifyOtp, verifyEmail} from "../controllers/authController.js"
import userAuth from "../middleware/userauth.js";
import { loginLimiter, signupLimiter } from "../middleware/limiterMiddlerware.js"

const authRouter = express.Router();
authRouter.post("/register",signupLimiter, Register);
authRouter.post("/login", loginLimiter, Login);
authRouter.post("/logout", Logout);
authRouter.post("/send-otp", userAuth, sendVerifyOtp);
authRouter.post("/verify-email", userAuth, verifyEmail);

export default authRouter;