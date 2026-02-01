import express from "express";
import { register, verifyEmail } from "../controllers/auth.controller.js";

const authRouter = express.Router();

// User registration routes
authRouter.post("/register", register);
authRouter.post("/verify-email", verifyEmail);

export default authRouter;