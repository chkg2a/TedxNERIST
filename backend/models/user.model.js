import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    whatsappNumber: {
        type: String,
        required: true,
    },

    department: {
        type: String,
    },

    rollNo: {
        type: String,
    },

    year: {
        type: String,
    },

    isNeristianStudent: {
        type: Boolean,
        default: false,
    },

    // OTP verification
    otp: String,
    otpExpiresAt: Date,

    isVerified: {
        type: Boolean,
        default: false,
    },

    // Ticket / entry
    ticketId: String,
    ticketGeneratedAt: Date,

    // Event check-in
    checkedIn: {
        type: Boolean,
        default: false,
    },
    checkedInAt: Date,

}, { timestamps: true });

const Registration = mongoose.model("Registration", registrationSchema);
export default Registration;
