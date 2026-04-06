import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    // Buyer information
    name: {
        type: String,
        required: true,
        trim: true,
    },
    contactNumber: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },

    // Ticket details
    ticketId: {
        type: String,
        unique: true,
        sparse: true,
    },
    ticketType: {
        type: String,
        enum: ["general", "vip"],
        default: "general",
    },
    quantity: {
        type: Number,
        default: 1,
        min: 1,
        max: 5,
    },
    amount: {
        type: Number,
        required: true,
    },

    // OTP verification
    otp: String,
    otpExpiresAt: Date,
    isVerified: {
        type: Boolean,
        default: false,
    },

    // Payment status
    paymentStatus: {
        type: String,
        enum: ["pending", "completed", "failed", "refunded"],
        default: "pending",
    },

    // Razorpay Integration
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,

    // Event check-in
    checkedIn: {
        type: Boolean,
        default: false,
    },
    checkedInAt: Date,

}, { timestamps: true });

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
