import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./db/connectDb.js";
import authRouter from "./routes/auth.routes.js";
import adminRouter from "./routes/admin.routes.js";
import ticketRouter from "./routes/ticket.routes.js";
import { razorpayWebhook } from "./controllers/ticket.controller.js";
dotenv.config();


const PORT = process.env.PORT || 8080;


const app = express();

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true, // Allow cookies to be sent
}));

// Razorpay Webhook (Needs raw body for signature verification)
app.post("/api/webhook/razorpay", express.raw({ type: "application/json" }), razorpayWebhook);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/tickets", ticketRouter);

// Health check endpoint
app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok", message: "Server is running" });
});

app.listen(PORT, async () => {
    await connectDb();
    console.log(`Server is running on port ${PORT}`);
});