import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Admin from "../models/admin.model.js";
import Registration from "../models/user.model.js";
import { generateTokensAndSetCookies } from "../utils/generateTokenandCookies.js";
dotenv.config();


export const registerAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const admin = await Admin.findOne({ email });
        if (admin) {
            return res.status(400).json({ message: "Admin already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = await Admin.create({
            email,
            passwordHash: hashedPassword,
        });
        res.status(201).json({
            message: "Admin registered successfully",
            admin: {
                _id: newAdmin._id,
                email: newAdmin.email,
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: "Admin not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const { refreshToken } = generateTokensAndSetCookies(res, admin._id);
        admin.refreshToken = await bcrypt.hash(refreshToken, 10);
        await admin.save();
        res.status(200).json({
            message: "Admin logged in successfully",
            admin: {
                _id: admin._id,
                email: admin.email,
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const refreshAccessToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) return res.status(401).json({ message: "No refresh token" });

        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET);
        const admin = await Admin.findById(decoded.userId);
        if (!admin || !admin.refreshToken) return res.status(401).json({ message: "Invalid refresh token" });

        const match = await bcrypt.compare(token, admin.refreshToken);
        if (!match) return res.status(401).json({ message: "Invalid refresh token" });

        const { refreshToken: newRefresh } = generateTokensAndSetCookies(res, admin._id);
        admin.refreshToken = await bcrypt.hash(newRefresh, 10);
        await admin.save();

        return res.status(200).json({ message: "Token refreshed" });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Invalid refresh token" });
    }
}

export const logoutAdmin = async (req, res) => {
    try {
        // Clear refresh token from database
        const admin = await Admin.findById(req.userId);
        if (admin) {
            admin.refreshToken = null;
            await admin.save();
        }

        res.cookie("refreshToken", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 0,
        });
        res.cookie("accessToken", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 0,
        });
        res.status(200).json({ message: "Admin logged out successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Get current admin session
export const getMe = async (req, res) => {
    try {
        const admin = await Admin.findById(req.userId).select("-passwordHash -refreshToken");
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json({ admin });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Get all registrations with pagination and filtering
export const getAllRegistrations = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        const { verified, department, year } = req.query;

        // Build filter object
        const filter = {};
        if (verified !== undefined) {
            filter.isVerified = verified === "true";
        }
        if (department) {
            filter.department = department;
        }
        if (year) {
            filter.year = year;
        }

        const registrations = await Registration.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .select("-otp -otpExpiresAt");

        const total = await Registration.countDocuments(filter);

        res.status(200).json({
            registrations,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalRegistrations: total,
                hasMore: skip + registrations.length < total
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Get single registration by ID
export const getRegistrationById = async (req, res) => {
    try {
        const { id } = req.params;
        const registration = await Registration.findById(id).select("-otp -otpExpiresAt");

        if (!registration) {
            return res.status(404).json({ message: "Registration not found" });
        }

        res.status(200).json({ registration });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
    try {
        const totalRegistrations = await Registration.countDocuments();
        const verifiedRegistrations = await Registration.countDocuments({ isVerified: true });
        const pendingRegistrations = await Registration.countDocuments({ isVerified: false });
        const neristianStudents = await Registration.countDocuments({ isNeristianStudent: true });

        // Get registrations by department
        const departmentStats = await Registration.aggregate([
            { $match: { department: { $exists: true, $ne: null } } },
            { $group: { _id: "$department", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // Get registrations by year
        const yearStats = await Registration.aggregate([
            { $match: { year: { $exists: true, $ne: null } } },
            { $group: { _id: "$year", count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);

        // Get recent registrations (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentRegistrations = await Registration.countDocuments({
            createdAt: { $gte: sevenDaysAgo }
        });

        // Get checked-in count (users with ticketId)
        const checkedIn = await Registration.countDocuments({
            ticketId: { $exists: true, $ne: null }
        });

        res.status(200).json({
            stats: {
                totalRegistrations,
                verifiedRegistrations,
                pendingRegistrations,
                neristianStudents,
                recentRegistrations,
                checkedIn,
                departmentStats,
                yearStats
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Delete a registration
export const deleteRegistration = async (req, res) => {
    try {
        const { id } = req.params;
        const registration = await Registration.findByIdAndDelete(id);

        if (!registration) {
            return res.status(404).json({ message: "Registration not found" });
        }

        res.status(200).json({ message: "Registration deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Search registrations
export const searchRegistrations = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || q.length < 2) {
            return res.status(400).json({ message: "Search query must be at least 2 characters" });
        }

        const registrations = await Registration.find({
            $or: [
                { name: { $regex: q, $options: "i" } },
                { email: { $regex: q, $options: "i" } },
                { whatsappNumber: { $regex: q, $options: "i" } },
                { rollNo: { $regex: q, $options: "i" } },
                { ticketId: { $regex: q, $options: "i" } }
            ]
        })
            .limit(50)
            .select("-otp -otpExpiresAt");

        res.status(200).json({ registrations });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Check-in user (mark attendance at event)
export const checkInUser = async (req, res) => {
    try {
        const { ticketId } = req.body;

        if (!ticketId) {
            return res.status(400).json({ message: "Ticket ID is required" });
        }

        const registration = await Registration.findOne({ ticketId });

        if (!registration) {
            return res.status(404).json({ message: "Invalid ticket ID" });
        }

        if (!registration.isVerified) {
            return res.status(400).json({ message: "User is not verified" });
        }

        if (registration.checkedIn) {
            return res.status(400).json({
                message: "User already checked in",
                checkedInAt: registration.checkedInAt
            });
        }

        registration.checkedIn = true;
        registration.checkedInAt = new Date();
        await registration.save();

        res.status(200).json({
            message: "Check-in successful",
            registration: {
                name: registration.name,
                email: registration.email,
                ticketId: registration.ticketId,
                checkedInAt: registration.checkedInAt
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Export registrations data (for download)
export const exportRegistrations = async (req, res) => {
    try {
        const { format } = req.query;

        const registrations = await Registration.find({ isVerified: true })
            .select("name email whatsappNumber department rollNo year ticketId isNeristianStudent checkedIn checkedInAt createdAt")
            .sort({ createdAt: -1 });

        res.status(200).json({ registrations });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}