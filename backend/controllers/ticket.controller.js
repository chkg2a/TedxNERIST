import Ticket from "../models/ticket.model.js";
import { sendOtp, sendEmail } from "../mail-smtp/email.js";
import crypto from "crypto";
import Razorpay from "razorpay";
import { TICKET_PURCHASE_EMAIL_TEMPLATE } from "../utils/emailTemplates.js";
import dotenv from "dotenv";
dotenv.config();

// Ticket prices
const TICKET_PRICES = {
    general: 299,
    vip: 599,
};

// Purchase ticket (Step 1: Collect info + send OTP)
export const purchaseTicket = async (req, res) => {
    try {
        const { name, contactNumber, email, address, ticketType, quantity } = req.body;

        // Validate required fields
        if (!name || !contactNumber || !email || !address) {
            return res.status(400).json({ message: "All fields are required: name, contact number, email, and address" });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Validate contact number (10 digits)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(contactNumber)) {
            return res.status(400).json({ message: "Contact number must be 10 digits" });
        }

        // Check for existing unverified ticket with same email (allow re-purchase)
        const existingTicket = await Ticket.findOne({ email, isVerified: false });
        if (existingTicket) {
            // Update existing unverified ticket and resend OTP
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            existingTicket.name = name;
            existingTicket.contactNumber = contactNumber;
            existingTicket.address = address;
            existingTicket.ticketType = ticketType || "general";
            existingTicket.quantity = quantity || 1;
            existingTicket.amount = (TICKET_PRICES[ticketType || "general"]) * (quantity || 1);
            existingTicket.otp = otp;
            existingTicket.otpExpiresAt = Date.now() + 10 * 60 * 1000;
            await existingTicket.save();

            await sendOtp(email, otp);

            return res.status(200).json({ message: "OTP re-sent to email" });
        }

        // Check for already verified ticket with same email
        const verifiedTicket = await Ticket.findOne({ email, isVerified: true });
        if (verifiedTicket) {
            return res.status(400).json({ message: "A ticket has already been purchased with this email" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const type = ticketType || "general";
        const qty = quantity || 1;
        const amount = TICKET_PRICES[type] * qty;

        await Ticket.create({
            name,
            contactNumber,
            email,
            address,
            ticketType: type,
            quantity: qty,
            amount,
            otp,
            otpExpiresAt: Date.now() + 10 * 60 * 1000, // 10 min
        });

        await sendOtp(email, otp);

        res.status(201).json({
            message: "OTP sent to email",
            amount,
        });
    } catch (error) {
        console.error("Ticket purchase error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Verify ticket purchase (Step 2: OTP verification & create Razorpay Order)
export const verifyTicketPurchase = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const ticket = await Ticket.findOne({
            email,
            otp,
            otpExpiresAt: { $gt: Date.now() },
        });

        if (!ticket) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        ticket.isVerified = true;
        ticket.otp = null;
        ticket.otpExpiresAt = null;
        await ticket.save();

        // Initialize Razorpay
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        // Create Razorpay order
        const options = {
            amount: ticket.amount * 100, // Amount in paise
            currency: "INR",
            receipt: `receipt_${ticket._id}`,
        };

        const order = await razorpay.orders.create(options);

        // Store order ID on ticket
        ticket.razorpayOrderId = order.id;
        await ticket.save();

        res.status(200).json({
            message: "OTP verified. Proceeding to payment.",
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            key: process.env.RAZORPAY_KEY,
            ticket: {
                id: ticket._id,
                name: ticket.name,
                email: ticket.email,
                contactNumber: ticket.contactNumber,
            }
        });
    } catch (error) {
        console.error("Ticket verify error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Capture Razorpay Payment (Step 3: Signature verification)
export const capturePayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const ticket = await Ticket.findOne({ razorpayOrderId: razorpay_order_id });
        if (!ticket) {
            return res.status(404).json({ message: "Ticket order not found" });
        }

        // Verify signature
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        const isSignatureValid = expectedSignature === razorpay_signature;

        if (!isSignatureValid) {
            ticket.paymentStatus = "failed";
            await ticket.save();
            return res.status(400).json({ message: "Payment verification failed" });
        }

        // Generate unique ticket ID
        const ticketId = "TEDX-TKT-" + Math.random().toString(36).substring(2, 10).toUpperCase();

        ticket.razorpayPaymentId = razorpay_payment_id;
        ticket.razorpaySignature = razorpay_signature;
        ticket.paymentStatus = "completed";
        ticket.ticketId = ticketId;
        await ticket.save();

        // Send professional confirmation email using template
        const platformUrl = process.env.PLATFORM_URL || process.env.FRONTEND_URL || "/";
        const confirmationHtml = TICKET_PURCHASE_EMAIL_TEMPLATE
            .replace(/\{buyerName\}/g, ticket.name)
            .replace(/\{buyerEmail\}/g, ticket.email)
            .replace(/\{buyerContact\}/g, ticket.contactNumber)
            .replace(/\{buyerAddress\}/g, ticket.address)
            .replace(/\{ticketId\}/g, ticketId)
            .replace(/\{amount\}/g, `₹${ticket.amount}`)
            .replace(/\{platformUrl\}/g, platformUrl);

        await sendEmail(ticket.email, "🎟️ Your TEDxNERIST Ticket Confirmation", confirmationHtml);

        res.status(200).json({
            message: "Payment successful and ticket confirmed!",
            ticketId,
        });

    } catch (error) {
        console.error("Payment capture error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get ticket details by ticket ID (public)
export const getTicketByTicketId = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const ticket = await Ticket.findOne({ ticketId, isVerified: true })
            .select("-otp -otpExpiresAt");

        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        res.status(200).json({ ticket });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ===== ADMIN ENDPOINTS =====

// Get all tickets (admin)
export const getAllTickets = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        const { status, type } = req.query;

        const filter = {};
        if (status) filter.paymentStatus = status;
        if (type) filter.ticketType = type;

        const tickets = await Ticket.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .select("-otp -otpExpiresAt");

        const total = await Ticket.countDocuments(filter);

        res.status(200).json({
            tickets,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalTickets: total,
                hasMore: skip + tickets.length < total,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get ticket stats (admin)
export const getTicketStats = async (req, res) => {
    try {
        const totalTickets = await Ticket.countDocuments({ isVerified: true });
        const totalRevenue = await Ticket.aggregate([
            { $match: { isVerified: true, paymentStatus: "completed" } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);
        const generalTickets = await Ticket.countDocuments({ ticketType: "general", isVerified: true });
        const vipTickets = await Ticket.countDocuments({ ticketType: "vip", isVerified: true });
        const checkedInCount = await Ticket.countDocuments({ checkedIn: true });
        const pendingCount = await Ticket.countDocuments({ isVerified: false });

        res.status(200).json({
            stats: {
                totalTickets,
                totalRevenue: totalRevenue[0]?.total || 0,
                generalTickets,
                vipTickets,
                checkedInCount,
                pendingCount,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Search tickets (admin)
export const searchTickets = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q || q.length < 2) {
            return res.status(400).json({ message: "Search query must be at least 2 characters" });
        }

        const tickets = await Ticket.find({
            $or: [
                { name: { $regex: q, $options: "i" } },
                { email: { $regex: q, $options: "i" } },
                { contactNumber: { $regex: q, $options: "i" } },
                { ticketId: { $regex: q, $options: "i" } },
                { address: { $regex: q, $options: "i" } },
            ],
        })
            .limit(50)
            .select("-otp -otpExpiresAt");

        res.status(200).json({ tickets });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete ticket (admin)
export const deleteTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await Ticket.findByIdAndDelete(id);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        res.status(200).json({ message: "Ticket deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Check-in ticket holder (admin)
export const checkInTicketHolder = async (req, res) => {
    try {
        const { ticketId } = req.body;
        if (!ticketId) {
            return res.status(400).json({ message: "Ticket ID is required" });
        }

        const ticket = await Ticket.findOne({ ticketId });
        if (!ticket) {
            return res.status(404).json({ message: "Invalid ticket ID" });
        }
        if (!ticket.isVerified) {
            return res.status(400).json({ message: "Ticket is not verified" });
        }
        if (ticket.checkedIn) {
            return res.status(400).json({
                message: "Already checked in",
                checkedInAt: ticket.checkedInAt,
            });
        }

        ticket.checkedIn = true;
        ticket.checkedInAt = new Date();
        await ticket.save();

        res.status(200).json({
            message: "Check-in successful",
            ticket: {
                name: ticket.name,
                email: ticket.email,
                ticketId: ticket.ticketId,
                checkedInAt: ticket.checkedInAt,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
