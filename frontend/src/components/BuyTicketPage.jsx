import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check, Loader, ArrowLeft, User, Mail, Phone, MapPin, Ticket, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import Navbar from "./Navbar";
import Footer from "./Footer";
import toast from "react-hot-toast";

const tedxRed = "#eb0028";
const tedxRedLight = "#ff1a3d";
const tedxRedDim = "rgba(235, 0, 40, 0.35)";
const tedxRedSubtle = "rgba(235, 0, 40, 0.12)";
const borderDefault = "rgba(255, 255, 255, 0.12)";

const TICKET_PRICE = 1;

// Reusable styled input component
const StyledInput = ({ label, icon: Icon, error, ...props }) => (
    <div>
        <label
            className="block text-xs font-semibold tracking-[0.15em] uppercase mb-3"
            style={{ color: tedxRed, fontFamily: "Gilroy-Medium, sans-serif" }}
        >
            {label}
        </label>
        <div className="relative">
            {Icon && (
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <Icon size={18} />
                </div>
            )}
            <input
                {...props}
                className={`w-full bg-[#141414] border rounded-xl px-3 py-3 sm:px-4 sm:py-4 text-sm sm:text-base text-white placeholder-gray-600 focus:outline-none transition-all duration-300 ${Icon ? 'pl-10 sm:pl-12' : ''}`}
                style={{
                    borderColor: error ? '#ef4444' : borderDefault,
                    fontFamily: "Gilroy-Regular, sans-serif",
                }}
                onFocus={(e) => {
                    e.target.style.borderColor = tedxRed;
                    e.target.style.boxShadow = `0 0 0 3px ${tedxRedSubtle}`;
                }}
                onBlur={(e) => {
                    e.target.style.borderColor = error ? '#ef4444' : borderDefault;
                    e.target.style.boxShadow = 'none';
                }}
            />
        </div>
        {error && (
            <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs mt-2"
                style={{ fontFamily: "Gilroy-Regular, sans-serif" }}
            >
                {error}
            </motion.p>
        )}
    </div>
);

// Textarea variant
const StyledTextarea = ({ label, icon: Icon, error, ...props }) => (
    <div>
        <label
            className="block text-xs font-semibold tracking-[0.15em] uppercase mb-3"
            style={{ color: tedxRed, fontFamily: "Gilroy-Medium, sans-serif" }}
        >
            {label}
        </label>
        <div className="relative">
            {Icon && (
                <div className="absolute left-4 top-4 pointer-events-none text-gray-500">
                    <Icon size={18} />
                </div>
            )}
            <textarea
                {...props}
                rows={3}
                className={`w-full bg-[#141414] border rounded-xl px-3 py-3 sm:px-4 sm:py-4 text-sm sm:text-base text-white placeholder-gray-600 focus:outline-none transition-all duration-300 resize-none ${Icon ? 'pl-10 sm:pl-12' : ''}`}
                style={{
                    borderColor: error ? '#ef4444' : borderDefault,
                    fontFamily: "Gilroy-Regular, sans-serif",
                }}
                onFocus={(e) => {
                    e.target.style.borderColor = tedxRed;
                    e.target.style.boxShadow = `0 0 0 3px ${tedxRedSubtle}`;
                }}
                onBlur={(e) => {
                    e.target.style.borderColor = error ? '#ef4444' : borderDefault;
                    e.target.style.boxShadow = 'none';
                }}
            />
        </div>
        {error && (
            <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs mt-2"
                style={{ fontFamily: "Gilroy-Regular, sans-serif" }}
            >
                {error}
            </motion.p>
        )}
    </div>
);




export default function BuyTicketPage() {
    const navigate = useNavigate();
    const { purchaseTicket, verifyTicketPurchase, capturePayment, isLoading, error, clearError } = useAuthStore();

    const [step, setStep] = useState(1); // 1: Form, 2: OTP, 3: Success
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contactNumber: "",
        address: "",
    });
    const [formError, setFormError] = useState({});
    const [purchaseResult, setPurchaseResult] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormError({ ...formError, [name]: "" });
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = "Full name is required";
        if (!formData.email.trim()) errors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "Invalid email format";
        }
        if (!formData.contactNumber.trim()) errors.contactNumber = "Contact number is required";
        else if (!/^\d{10}$/.test(formData.contactNumber)) {
            errors.contactNumber = "Must be 10 digits";
        }
        if (!formData.address.trim()) errors.address = "Address is required";

        setFormError(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const result = await purchaseTicket({
            name: formData.name,
            email: formData.email,
            contactNumber: formData.contactNumber,
            address: formData.address,
        });

        console.log("=== FRONTEND LOG: Result from authStore ===", result);

        if (!result.success) {
            toast.error(result.message || "Failed to create order");
            return;
        }

        if (result.paymentLinkUrl) {
            // Redirect to Razorpay hosted checkout
            window.location.href = result.paymentLinkUrl;
        } else {
            toast.error("Failed to generate payment link.");
        }
    };





    const handleGoHome = () => {
        navigate("/");
    };

    const totalAmount = TICKET_PRICE;

    // ============ STEP 3: SUCCESS ============
    if (step === 3) {
        return (
            <div className="min-h-screen bg-[#0a0a0a]">
                <Navbar />
                <div className="flex items-start sm:items-center justify-center min-h-screen px-3 pt-24 pb-8 sm:px-4 sm:pt-28 sm:pb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 max-w-lg w-full text-center relative overflow-hidden"
                        style={{ background: "#111111", border: `1px solid ${borderDefault}` }}
                    >
                        {/* Success glow */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: "radial-gradient(circle at 50% 0%, rgba(34, 197, 94, 0.1) 0%, transparent 60%)",
                            }}
                        />

                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 relative z-10"
                            style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}
                        >
                            <Check className="text-white w-8 h-8 sm:w-10 sm:h-10" />
                        </motion.div>

                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 relative z-10"
                            style={{ fontFamily: "Cirka, serif" }}
                        >
                            Ticket Confirmed! 🎉
                        </motion.h2>

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-300 text-sm sm:text-base mb-4 relative z-10"
                            style={{ fontFamily: "Gilroy-Regular, sans-serif" }}
                        >
                            Your ticket for TEDxNERIST has been booked!
                        </motion.p>

                        {purchaseResult?.ticketId && (
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="rounded-xl p-4 mb-6 relative z-10"
                                style={{
                                    background: "rgba(235, 0, 40, 0.08)",
                                    border: `1px solid rgba(235, 0, 40, 0.2)`,
                                }}
                            >
                                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1" style={{ fontFamily: "Gilroy-Medium, sans-serif" }}>
                                    Your Ticket ID
                                </p>
                                <p className="text-xl sm:text-2xl font-bold tracking-wider" style={{ color: tedxRed, fontFamily: "OverpassMono, monospace" }}>
                                    {purchaseResult.ticketId}
                                </p>
                            </motion.div>
                        )}

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-gray-500 text-xs sm:text-sm mb-6 sm:mb-8 relative z-10"
                            style={{ fontFamily: "Gilroy-Regular, sans-serif" }}
                        >
                            A confirmation email with your ticket details has been sent to <span style={{ color: tedxRed }}>{formData.email}</span>
                        </motion.p>

                        <motion.button
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleGoHome}
                            className="px-6 py-2.5 sm:px-8 sm:py-3 rounded-full font-medium transition-all text-white text-sm sm:text-base relative z-10"
                            style={{
                                backgroundColor: tedxRed,
                                fontFamily: "Gilroy-Medium, sans-serif",
                            }}
                        >
                            Back to Home
                        </motion.button>
                    </motion.div>
                </div>
                <Footer />
            </div>
        );
    }



    // ============ STEP 1: FORM ============
    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            <Navbar />
            <div className="flex items-start sm:items-center justify-center min-h-screen px-3 pt-24 pb-8 sm:px-4 sm:pt-28 sm:pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 max-w-2xl w-full relative overflow-hidden"
                    style={{ background: "#111111", border: `1px solid ${borderDefault}` }}
                >
                    {/* Decorative top glow */}
                    <div className="absolute inset-0 pointer-events-none" style={{
                        background: "radial-gradient(circle at 50% -10%, rgba(235, 0, 40, 0.1) 0%, transparent 50%)"
                    }} />

                    {/* Header */}
                    <div className="relative z-10">
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="flex items-center gap-3 mb-2"
                        >
                            <motion.div
                                className="w-12 h-12 rounded-xl flex items-center justify-center"
                                style={{ background: `linear-gradient(135deg, ${tedxRed}, ${tedxRedLight})` }}
                                whileHover={{ rotate: 5 }}
                            >
                                <Ticket size={24} className="text-white" />
                            </motion.div>
                            <div>
                                <h2
                                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
                                    style={{ fontFamily: "Cirka, serif" }}
                                >
                                    Get Your Ticket
                                </h2>
                            </div>
                        </motion.div>
                        <motion.p
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8 ml-0 sm:ml-[60px]"
                            style={{ fontFamily: "Gilroy-Regular, sans-serif" }}
                        >
                            Secure your seat at <span style={{ color: tedxRed, fontWeight: 700 }}>TEDx</span>NERIST — Metamorphosis
                        </motion.p>
                    </div>

                    {/* Ticket Price Banner */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.25 }}
                        className="relative rounded-2xl p-5 sm:p-6 mb-6 sm:mb-8 z-10 overflow-hidden"
                        style={{
                            background: `linear-gradient(135deg, rgba(235, 0, 40, 0.15) 0%, rgba(235, 0, 40, 0.05) 100%)`,
                            border: `1px solid rgba(235, 0, 40, 0.25)`,
                        }}
                    >
                        <div className="absolute inset-0 pointer-events-none" style={{
                            background: `radial-gradient(circle at 50% 0%, ${tedxRedDim} 0%, transparent 70%)`,
                        }} />
                        <div className="relative z-10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Ticket size={22} style={{ color: tedxRed }} />
                                <span className="text-sm sm:text-base font-bold uppercase tracking-wider text-white" style={{ fontFamily: "Gilroy-Medium, sans-serif" }}>
                                    Event Ticket
                                </span>
                            </div>
                            <div>
                                <span className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: "Gilroy, sans-serif" }}>₹{TICKET_PRICE}</span>
                                <span className="text-gray-500 text-sm ml-1">/person</span>
                            </div>
                        </div>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-7 relative z-10">
                        {/* Buyer Information Section Header */}
                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center gap-2 mb-1"
                        >
                            <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${tedxRed}, transparent)` }} />
                            <span className="text-xs uppercase tracking-[0.2em] px-3 text-gray-500" style={{ fontFamily: "Gilroy-Medium, sans-serif" }}>
                                Buyer Information
                            </span>
                            <div className="h-px flex-1" style={{ background: `linear-gradient(to left, ${tedxRed}, transparent)` }} />
                        </motion.div>

                        {/* Full Name */}
                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.35 }}
                        >
                            <StyledInput
                                label="Full Name"
                                icon={User}
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                error={formError.name}
                            />
                        </motion.div>

                        {/* Email + Contact Number row */}
                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7"
                        >
                            <StyledInput
                                label="Email Address"
                                icon={Mail}
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                error={formError.email}
                            />
                            <StyledInput
                                label="Contact Number"
                                icon={Phone}
                                type="tel"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                placeholder="9876543210"
                                error={formError.contactNumber}
                            />
                        </motion.div>

                        {/* Address */}
                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.45 }}
                        >
                            <StyledTextarea
                                label="Address"
                                icon={MapPin}
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter your complete address"
                                error={formError.address}
                            />
                        </motion.div>

                        {/* Order Summary */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="rounded-xl p-4 sm:p-5"
                            style={{
                                background: "rgba(235, 0, 40, 0.05)",
                                border: `1px solid rgba(235, 0, 40, 0.15)`,
                            }}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-400" style={{ fontFamily: "Gilroy-Regular, sans-serif" }}>
                                    Event Ticket × 1
                                </span>
                                <span className="text-sm text-gray-300" style={{ fontFamily: "Gilroy-Medium, sans-serif" }}>
                                    ₹{totalAmount}
                                </span>
                            </div>
                            <div className="h-px bg-gray-800 my-2" />
                            <div className="flex items-center justify-between">
                                <span className="text-base font-bold text-white" style={{ fontFamily: "Gilroy-Medium, sans-serif" }}>
                                    Total
                                </span>
                                <span className="text-xl font-bold" style={{ color: tedxRed, fontFamily: "Gilroy, sans-serif" }}>
                                    ₹{totalAmount}
                                </span>
                            </div>
                        </motion.div>

                        {/* Error Message */}
                        {error && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-red-400 text-sm text-center"
                                style={{ fontFamily: "Gilroy-Regular, sans-serif" }}
                            >
                                {error}
                            </motion.p>
                        )}

                        {/* Submit Button */}
                        <motion.button
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.55 }}
                            whileHover={{ scale: 1.02, boxShadow: `0 8px 30px ${tedxRedDim}` }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-3.5 sm:py-4 rounded-xl font-medium text-sm sm:text-base transition-all flex items-center justify-center gap-2"
                            style={{
                                backgroundColor: isLoading ? undefined : tedxRed,
                                fontFamily: "Gilroy-Medium, sans-serif",
                                boxShadow: isLoading ? "none" : `0 4px 20px ${tedxRedDim}`,
                            }}
                        >
                            {isLoading ? (
                                <Loader className="animate-spin" size={24} />
                            ) : (
                                <>
                                    <Ticket size={20} />
                                    Buy Ticket — ₹{totalAmount}
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </motion.button>

                        {/* Trust badges */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex items-center justify-center gap-4 pt-2"
                        >
                            <div className="flex items-center gap-1.5 text-gray-600 text-xs">
                                <Shield size={14} />
                                <span style={{ fontFamily: "Gilroy-Regular, sans-serif" }}>Secure checkout</span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-gray-700" />
                            <div className="flex items-center gap-1.5 text-gray-600 text-xs">
                                <Mail size={14} />
                                <span style={{ fontFamily: "Gilroy-Regular, sans-serif" }}>E-ticket via email</span>
                            </div>
                        </motion.div>
                    </form>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
}
