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
    sendBulkEmail,
    getCheckedInList,
    getAllPurchasedTickets,
    deletePurchasedTicket
} from "../controllers/admin.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const adminRouter = express.Router();


adminRouter.post("/login", loginAdmin);
adminRouter.post("/refresh-token", refreshAccessToken);
adminRouter.post("/register", verifyToken, registerAdmin); // Protected: only authenticated admins can create new admins

adminRouter.use(verifyToken);
adminRouter.post("/logout", logoutAdmin);
adminRouter.get("/me", getMe);


adminRouter.get("/registrations", getAllRegistrations);
adminRouter.get("/registrations/search", searchRegistrations);
adminRouter.get("/registrations/export", exportRegistrations);
adminRouter.get("/registrations/:id", getRegistrationById);
adminRouter.delete("/registrations/:id", deleteRegistration);

adminRouter.get("/purchased-tickets", getAllPurchasedTickets);
adminRouter.delete("/purchased-tickets/:id", deletePurchasedTicket);

adminRouter.get("/stats", getDashboardStats);
adminRouter.get("/timeline", getRegistrationTimeline);
adminRouter.get("/activity", getActivityLog);


adminRouter.post("/check-in", checkInUser);
adminRouter.get("/checked-in-list", getCheckedInList);
adminRouter.post("/bulk-email", sendBulkEmail);

export default adminRouter;
