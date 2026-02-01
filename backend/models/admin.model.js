import mongoose from "mongoose";


const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },

    passwordHash: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ["admin", "organizer"],
        default: "admin",
    },

    refreshToken: {
        type: String,
    }
}, { timestamps: true });

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
