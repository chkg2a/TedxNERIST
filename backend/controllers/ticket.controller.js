import Ticket from "../models/ticket.model.js";
import { sendOtp, sendEmail } from "../mail-smtp/email.js";
import crypto from "crypto";
import Razorpay from "razorpay";
import { TICKET_PURCHASE_EMAIL_TEMPLATE } from "../utils/emailTemplates.js";
import dotenv from "dotenv";
dotenv.config();

// Ticket prices
const TICKET_PRICES = {
    general: 1,
    vip: 1,
};

// Purchase ticket (Step 1: Collect info + Create Orders)
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

        const type = ticketType || "general";
        const qty = quantity || 1;
        const amount = TICKET_PRICES[type] * qty;

        // Create or update ticket
        let ticket = await Ticket.findOne({ email, isVerified: false });
        if (ticket) {
            ticket.name = name;
            ticket.contactNumber = contactNumber;
            ticket.address = address;
            ticket.ticketType = type;
            ticket.quantity = qty;
            ticket.amount = amount;
            // No OTP anymore
        } else {
            // Check for already verified ticket with same email
            const verifiedTicket = await Ticket.findOne({ email, isVerified: true });
            if (verifiedTicket) {
                return res.status(400).json({ message: "A ticket has already been purchased with this email" });
            }

            // Generate unique 4-digit ticket ID
            let generatedTicketId = "";
            let isUniqueId = false;
            while (!isUniqueId) {
                const random4Digit = Math.floor(1000 + Math.random() * 9000); 
                generatedTicketId = "TEDX-" + random4Digit;
                const existingTicketWithId = await Ticket.findOne({ ticketId: generatedTicketId });
                if (!existingTicketWithId) {
                    isUniqueId = true;
                }
            }

            ticket = new Ticket({
                name,
                contactNumber,
                email,
                address,
                ticketType: type,
                quantity: qty,
                amount,
                ticketId: generatedTicketId,
                isVerified: true
            });
        }

        // Add ticketId to existing unverified records if missing
        if (ticket && !ticket.ticketId) {
            let generatedTicketId = "";
            let isUniqueId = false;
            while (!isUniqueId) {
                const random4Digit = Math.floor(1000 + Math.random() * 9000); 
                generatedTicketId = "TEDX-" + random4Digit;
                const existingTicketWithId = await Ticket.findOne({ ticketId: generatedTicketId });
                if (!existingTicketWithId) {
                    isUniqueId = true;
                }
            }
            ticket.ticketId = generatedTicketId;
        }

        // Initialize Razorpay
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        // Create Razorpay order
        // Create Razorpay payment link
        const paymentLink = await razorpay.paymentLink.create({
            amount: ticket.amount * 100, // Amount in paise
            currency: "INR",
            accept_partial: false,
            description: `TEDxNERIST Ticket - ${ticket.ticketType}`,
            customer: {
                name: ticket.name,
                email: ticket.email,
                contact: ticket.contactNumber,
            },
            notify: {
                sms: false,
                email: false,
            },
            reminder_enable: false,
            callback_url: `${process.env.FRONTEND_URL || "http://localhost:5173"}/payment-success?ticket_raw_id=${ticket._id}`,
            callback_method: "get",
            notes: {
                ticket_id: ticket._id.toString()
            }
        });

        ticket.razorpayOrderId = paymentLink.id;
        await ticket.save();

        res.status(200).json({
            message: "Proceeding to payment.",
            paymentLinkUrl: paymentLink.short_url,
            ticket: {
                id: ticket._id,
                name: ticket.name,
                email: ticket.email,
                contactNumber: ticket.contactNumber,
            }
        });
    } catch (error) {
        console.error("Ticket purchase error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Webhook for complete payment security
export const razorpayWebhook = async (req, res) => {
    try {
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
        const signature = req.headers["x-razorpay-signature"];

        const bodyString = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : req.body;

        const expectedSignature = crypto
            .createHmac("sha256", secret.trim())
            .update(bodyString)
            .digest("hex");

        if (expectedSignature !== signature) {
            return res.status(400).json({ message: "Invalid signature" });
        }

        const payload = JSON.parse(bodyString);

        if (payload.event === "payment_link.paid") {
            const paymentLinkEntity = payload.payload.payment_link.entity;
            const ticket_id = paymentLinkEntity.notes.ticket_id;

            const ticket = await Ticket.findById(ticket_id);
            if (ticket && ticket.paymentStatus !== "completed") {
                // Ensure ticketId exists
                let finalTicketId = ticket.ticketId;
                if (!finalTicketId) {
                    let isUnique = false;
                    while (!isUnique) {
                        const random4Digit = Math.floor(1000 + Math.random() * 9000); // 1000 to 9999
                        finalTicketId = "TEDX-" + random4Digit;
                        const existingTicket = await Ticket.findOne({ ticketId: finalTicketId });
                        if (!existingTicket) {
                            isUnique = true;
                        }
                    }
                    ticket.ticketId = finalTicketId;
                }

                ticket.paymentStatus = "completed";
                
                if (payload.payload.payment && payload.payload.payment.entity) {
                    ticket.razorpayPaymentId = payload.payload.payment.entity.id;
                }
                await ticket.save();

                // Send professional confirmation email using template
                const platformUrl = process.env.PLATFORM_URL || process.env.FRONTEND_URL || "/";
                const confirmationHtml = TICKET_PURCHASE_EMAIL_TEMPLATE
                    .replace(/\{buyerName\}/g, ticket.name)
                    .replace(/\{buyerEmail\}/g, ticket.email)
                    .replace(/\{buyerContact\}/g, ticket.contactNumber)
                    .replace(/\{buyerAddress\}/g, ticket.address)
                    .replace(/\{ticketId\}/g, finalTicketId)
                    .replace(/\{amount\}/g, `₹${ticket.amount}`)
                    .replace(/\{platformUrl\}/g, platformUrl);

                await sendEmail(ticket.email, "🎟️ Your TEDxNERIST Ticket Confirmation", confirmationHtml);
            }
        }

        res.status(200).json({ status: "ok" });
    } catch (error) {
        console.error("Webhook processing error:", error);
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

        // Verify signature (use .trim() defensively to protect against whitespace in .env files)
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET.trim())
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        const isSignatureValid = expectedSignature === razorpay_signature;

        if (!isSignatureValid) {
            ticket.paymentStatus = "failed";
            await ticket.save();
            return res.status(400).json({ message: "Payment verification failed" });
        }

        // Generate unique 4-digit ticket ID
        let ticketId = "";
        let isUnique = false;
        while (!isUnique) {
            const random4Digit = Math.floor(1000 + Math.random() * 9000); // 1000 to 9999
            ticketId = "TEDX-" + random4Digit;
            const existingTicket = await Ticket.findOne({ ticketId });
            if (!existingTicket) {
                isUnique = true;
            }
        }
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

// Get ticket status by raw Mongo ID
export const getPaymentStatus = async (req, res) => {
    try {
        const { rawId } = req.params;
        const ticket = await Ticket.findById(rawId).select("-otp -otpExpiresAt");

        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        res.status(200).json({ ticket, status: ticket.paymentStatus });
    } catch (error) {
        console.error("Payment status poll error:", error);
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
