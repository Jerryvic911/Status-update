import { Router } from "express";
import express  from 'express';
import {Register, Login, Logout} from "../controllers/authController.js"

const authRouter = express.Router();
authRouter.post("/register", Register);
authRouter.post("/login", Login);
authRouter.post("/logout", Logout);

export default authRouter;