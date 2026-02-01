import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import crypto from "crypto";
import { generateTokensAndSetCookies } from "../utils/generateTokenandCookies.js";
import { sendOtp } from "../mail-smtp/email.js";
import { sendWelcomeEmail } from "../mail-smtp/email.js";
dotenv.config();

export const register = async (req, res) => {
    try {
        const {
            name,
            email,
            whatsappNumber,
            areyouneristian,
            rollNo,
            year
        } = req.body;

        if (!name || !email || !whatsappNumber) {
            return res.status(400).json({ message: "Required fields missing" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Already registered" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const user = await User.create({
            name,
            email,
            whatsappNumber,
            areyouneristian,
            rollNo,
            year,
            otp,
            otpExpiresAt: Date.now() + 10 * 60 * 1000 // 10 min
        });

        await sendOtp(email, otp, name);

        res.status(201).json({
            message: "OTP sent to email"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const verifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({
            email,
            otp,
            otpExpiresAt: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        // Generate ticket
        const ticketId = "TEDX-" + Math.random().toString(36).substring(2, 10).toUpperCase();

        user.isVerified = true;
        user.otp = null;
        user.otpExpiresAt = null;
        user.ticketId = ticketId;
        user.ticketGeneratedAt = new Date();

        await user.save();

        await sendWelcomeEmail(user.email, user.name, ticketId);

        res.status(200).json({
            message: "Registration successful",
            ticketId
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

