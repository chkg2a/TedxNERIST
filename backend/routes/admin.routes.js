import express from "express";
import {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    refreshAccessToken,
    getMe,
    getAllRegistrations,
    getRegistrationById,
    getDashboardStats,
    deleteRegistration,
    searchRegistrations,
    checkInUser,
    exportRegistrations
} from "../controllers/admin.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const adminRouter = express.Router();

// Public routes (no authentication required)
adminRouter.post("/login", loginAdmin);
adminRouter.post("/refresh-token", refreshAccessToken);

// Protected routes (authentication required)
adminRouter.use(verifyToken); // Apply middleware to all routes below

// Only authenticated admins can create new admins
adminRouter.post("/register", registerAdmin);
adminRouter.post("/logout", logoutAdmin);
adminRouter.get("/me", getMe);

// Registration management routes
adminRouter.get("/registrations", getAllRegistrations);
adminRouter.get("/registrations/search", searchRegistrations);
adminRouter.get("/registrations/export", exportRegistrations);
adminRouter.get("/registrations/:id", getRegistrationById);
adminRouter.delete("/registrations/:id", deleteRegistration);

// Dashboard and stats
adminRouter.get("/stats", getDashboardStats);

// Event check-in
adminRouter.post("/check-in", checkInUser);

export default adminRouter;
