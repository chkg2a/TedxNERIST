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
    exportRegistrations,
    getRegistrationTimeline,
    getActivityLog,
    sendBulkEmail
} from "../controllers/admin.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const adminRouter = express.Router();


adminRouter.post("/login", loginAdmin);
adminRouter.post("/refresh-token", refreshAccessToken);

adminRouter.use(verifyToken);


adminRouter.post("/register", registerAdmin);
adminRouter.post("/logout", logoutAdmin);
adminRouter.get("/me", getMe);


adminRouter.get("/registrations", getAllRegistrations);
adminRouter.get("/registrations/search", searchRegistrations);
adminRouter.get("/registrations/export", exportRegistrations);
adminRouter.get("/registrations/:id", getRegistrationById);
adminRouter.delete("/registrations/:id", deleteRegistration);


adminRouter.get("/stats", getDashboardStats);
adminRouter.get("/timeline", getRegistrationTimeline);
adminRouter.get("/activity", getActivityLog);


adminRouter.post("/check-in", checkInUser);
adminRouter.post("/bulk-email", sendBulkEmail);

export default adminRouter;
