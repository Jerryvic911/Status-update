import express  from 'express';
import {Register, Login, Logout, resendOtp, verifyEmail} from "../controllers/authController.js"
import { protect } from "../middleware/authmiddleware.js"
import { loginLimiter, signupLimiter } from "../middleware/limiterMiddlerware.js"

const authRouter = express.Router();
authRouter.post("/register",signupLimiter, Register);
authRouter.post("/login", loginLimiter, Login);
authRouter.post("/logout", Logout);
authRouter.post("/resend-otp",   resendOtp);
authRouter.post("/verify-email",  verifyEmail);

export default authRouter;