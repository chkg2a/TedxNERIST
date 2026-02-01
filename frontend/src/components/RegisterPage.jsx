import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check, Loader, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import Navbar from "./Navbar";

export default function RegisterPage() {
    const navigate = useNavigate();
    const {
        registerUser,
        verifyEmail,
        isLoading,
        error,
        registrationEmail,
        isRegistered,
        ticketId,
        resetRegistration,
        clearError
    } = useAuthStore();

    const [step, setStep] = useState(1); // 1: Form, 2: OTP, 3: Success
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        whatsappNumber: "",
        isNeristianStudent: false,
        department: "",
        rollNo: "",
        year: "",
    });
    const [otp, setOtp] = useState("");
    const [formError, setFormError] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
        setFormError({ ...formError, [name]: "" });
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = "Name is required";
        if (!formData.email.trim()) errors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "Invalid email format";
        }
        if (!formData.whatsappNumber.trim()) errors.whatsappNumber = "WhatsApp number is required";
        else if (!/^\d{10}$/.test(formData.whatsappNumber)) {
            errors.whatsappNumber = "Phone number must be 10 digits";
        }

        if (formData.isNeristianStudent) {
            if (!formData.department) errors.department = "Department is required";
            if (!formData.rollNo) errors.rollNo = "Roll number is required";
            if (!formData.year) errors.year = "Year is required";
        }

        setFormError(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const result = await registerUser({
            name: formData.name,
            email: formData.email,
            whatsappNumber: formData.whatsappNumber,
            areyouneristian: formData.isNeristianStudent,
            department: formData.isNeristianStudent ? formData.department : undefined,
            rollNo: formData.isNeristianStudent ? formData.rollNo : undefined,
            year: formData.isNeristianStudent ? formData.year : undefined,
        });

        if (result.success) {
            setStep(2);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (!otp || otp.length !== 6) {
            setFormError({ otp: "Please enter a valid 6-digit OTP" });
            return;
        }

        const result = await verifyEmail(registrationEmail || formData.email, otp);
        if (result.success) {
            setStep(3);
        }
    };

    const handleGoHome = () => {
        resetRegistration();
        navigate("/");
    };

    // Step 3: Success
    if (step === 3 || isRegistered) {
        return (
            <div className="min-h-screen bg-[#0a0a0a]">
                <Navbar />
                <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 max-w-lg w-full text-center border border-gray-700"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                            <Check size={40} className="text-white" />
                        </motion.div>

                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-3xl md:text-4xl font-bold text-white mb-4"
                            style={{ fontFamily: "Cirka, serif" }}
                        >
                            Registration Successful!
                        </motion.h2>

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-300 mb-6"
                        >
                            Thank you for registering for TEDxNERIST! Your ticket has been generated.
                        </motion.p>

                        {ticketId && (
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="bg-red-600/20 border border-red-500/30 rounded-2xl p-4 mb-6"
                            >
                                <p className="text-gray-400 text-sm mb-1">Your Ticket ID</p>
                                <p className="text-2xl font-bold text-red-500">{ticketId}</p>
                            </motion.div>
                        )}

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-gray-400 text-sm mb-8"
                        >
                            A confirmation email with your ticket details has been sent to your email address.
                        </motion.p>

                        <motion.button
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleGoHome}
                            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-medium transition-all"
                        >
                            Back to Home
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        );
    }

    // Step 2: OTP Verification
    if (step === 2) {
        return (
            <div className="min-h-screen bg-[#0a0a0a]">
                <Navbar />
                <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 max-w-md w-full border border-gray-700"
                    >
                        <button
                            onClick={() => { setStep(1); clearError(); }}
                            className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
                        >
                            <ArrowLeft size={20} className="mr-2" />
                            Back
                        </button>

                        <h2
                            className="text-3xl md:text-4xl font-bold text-white mb-2"
                            style={{ fontFamily: "Cirka, serif" }}
                        >
                            Verify Email
                        </h2>
                        <p className="text-gray-400 mb-8">
                            We've sent a 6-digit OTP to <span className="text-red-500">{registrationEmail || formData.email}</span>
                        </p>

                        <form onSubmit={handleVerifyOtp} className="space-y-6">
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Enter OTP</label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                                        setOtp(val);
                                        setFormError({ ...formError, otp: "" });
                                    }}
                                    placeholder="000000"
                                    className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white text-center text-2xl tracking-[0.5em] focus:outline-none focus:border-red-500 transition-colors"
                                    maxLength={6}
                                />
                                {formError.otp && (
                                    <p className="text-red-500 text-sm mt-2">{formError.otp}</p>
                                )}
                                {error && (
                                    <p className="text-red-500 text-sm mt-2">{error}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || otp.length !== 6}
                                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <Loader className="animate-spin" size={24} />
                                ) : (
                                    <>
                                        Verify & Complete Registration
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        );
    }

    // Step 1: Registration Form
    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            <Navbar />
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 max-w-2xl w-full border border-gray-700"
                >
                    <motion.h2
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl md:text-5xl font-bold text-white mb-2"
                        style={{ fontFamily: "Cirka, serif" }}
                    >
                        Register for <span className="text-red-600">TEDx</span>NERIST
                    </motion.h2>
                    <motion.p
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-400 mb-8"
                    >
                        Join us for an inspiring event filled with ideas worth spreading
                    </motion.p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <label className="block text-gray-400 text-sm mb-2">Full Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                className={`w-full bg-gray-800/50 border ${formError.name ? 'border-red-500' : 'border-gray-600'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors`}
                            />
                            {formError.name && <p className="text-red-500 text-sm mt-1">{formError.name}</p>}
                        </motion.div>

                        {/* Email */}
                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.35 }}
                        >
                            <label className="block text-gray-400 text-sm mb-2">Email Address *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your.email@example.com"
                                className={`w-full bg-gray-800/50 border ${formError.email ? 'border-red-500' : 'border-gray-600'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors`}
                            />
                            {formError.email && <p className="text-red-500 text-sm mt-1">{formError.email}</p>}
                        </motion.div>

                        {/* WhatsApp */}
                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <label className="block text-gray-400 text-sm mb-2">WhatsApp Number *</label>
                            <input
                                type="tel"
                                name="whatsappNumber"
                                value={formData.whatsappNumber}
                                onChange={handleChange}
                                placeholder="10-digit phone number"
                                className={`w-full bg-gray-800/50 border ${formError.whatsappNumber ? 'border-red-500' : 'border-gray-600'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors`}
                            />
                            {formError.whatsappNumber && <p className="text-red-500 text-sm mt-1">{formError.whatsappNumber}</p>}
                        </motion.div>

                        {/* NERIST Student Checkbox */}
                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.45 }}
                            className="flex items-center gap-3"
                        >
                            <input
                                type="checkbox"
                                name="isNeristianStudent"
                                id="isNeristianStudent"
                                checked={formData.isNeristianStudent}
                                onChange={handleChange}
                                className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-red-600 focus:ring-red-500"
                            />
                            <label htmlFor="isNeristianStudent" className="text-gray-300 cursor-pointer">
                                I am a NERIST student
                            </label>
                        </motion.div>

                        {/* NERIST Student Fields */}
                        <AnimatePresence>
                            {formData.isNeristianStudent && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6 overflow-hidden"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Department */}
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-2">Department *</label>
                                            <select
                                                name="department"
                                                value={formData.department}
                                                onChange={handleChange}
                                                className={`w-full bg-gray-800/50 border ${formError.department ? 'border-red-500' : 'border-gray-600'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors`}
                                            >
                                                <option value="">Select Department</option>
                                                <option value="CSE">Computer Science</option>
                                                <option value="ECE">Electronics & Communication</option>
                                                <option value="EE">Electrical Engineering</option>
                                                <option value="ME">Mechanical Engineering</option>
                                                <option value="CE">Civil Engineering</option>
                                                <option value="AGR">Agriculture</option>
                                                <option value="FOR">Forestry</option>
                                            </select>
                                            {formError.department && <p className="text-red-500 text-sm mt-1">{formError.department}</p>}
                                        </div>

                                        {/* Year */}
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-2">Year *</label>
                                            <select
                                                name="year"
                                                value={formData.year}
                                                onChange={handleChange}
                                                className={`w-full bg-gray-800/50 border ${formError.year ? 'border-red-500' : 'border-gray-600'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors`}
                                            >
                                                <option value="">Select Year</option>
                                                <option value="1">1st Year</option>
                                                <option value="2">2nd Year</option>
                                                <option value="3">3rd Year</option>
                                                <option value="4">4th Year</option>
                                            </select>
                                            {formError.year && <p className="text-red-500 text-sm mt-1">{formError.year}</p>}
                                        </div>
                                    </div>

                                    {/* Roll Number */}
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-2">Roll Number *</label>
                                        <input
                                            type="text"
                                            name="rollNo"
                                            value={formData.rollNo}
                                            onChange={handleChange}
                                            placeholder="Your roll number"
                                            className={`w-full bg-gray-800/50 border ${formError.rollNo ? 'border-red-500' : 'border-gray-600'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors`}
                                        />
                                        {formError.rollNo && <p className="text-red-500 text-sm mt-1">{formError.rollNo}</p>}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Error Message */}
                        {error && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-red-500 text-sm text-center"
                            >
                                {error}
                            </motion.p>
                        )}

                        {/* Submit Button */}
                        <motion.button
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <Loader className="animate-spin" size={24} />
                            ) : (
                                <>
                                    Continue to Verify
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
