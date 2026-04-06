import express from "express";
import {
    purchaseTicket,
    verifyTicketPurchase,
    getTicketByTicketId,
    getAllTickets,
    getTicketStats,
    searchTickets,
    deleteTicket,
    checkInTicketHolder,
    capturePayment,
    getPaymentStatus,
} from "../controllers/ticket.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const ticketRouter = express.Router();

// Public routes
ticketRouter.post("/purchase", purchaseTicket); // Send OTP
ticketRouter.post("/verify", verifyTicketPurchase); // Verify OTP, create Order
ticketRouter.post("/verify-payment", capturePayment); // Verify Razorpay signature
ticketRouter.get("/details/:ticketId", getTicketByTicketId);
ticketRouter.get("/status/:rawId", getPaymentStatus);

// Admin routes (protected)
ticketRouter.use(verifyToken);
ticketRouter.get("/all", getAllTickets);
ticketRouter.get("/stats", getTicketStats);
ticketRouter.get("/search", searchTickets);
ticketRouter.delete("/:id", deleteTicket);
ticketRouter.post("/check-in", checkInTicketHolder);

export default ticketRouter;
