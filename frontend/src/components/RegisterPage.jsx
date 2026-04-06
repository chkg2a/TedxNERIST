import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check, Loader, ArrowLeft, ChevronDown, User, Mail, Phone, Building2, Hash, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { id as studentList } from "../constants/StudentList";
import Navbar from "./Navbar";
import Footer from "./Footer";
import toast from "react-hot-toast";

const tedxRed = "#eb0028";
const tedxRedLight = "#ff1a3d";
const tedxRedDim = "rgba(235, 0, 40, 0.35)";
const tedxRedSubtle = "rgba(235, 0, 40, 0.12)";
const borderDefault = "rgba(255, 255, 255, 0.12)";

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

// Reusable styled select component
const StyledSelect = ({ label, icon: Icon, error, children, ...props }) => (
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
            <select
                {...props}
                className={`w-full bg-[#141414] border rounded-xl px-3 py-3 sm:px-4 sm:py-4 text-sm sm:text-base text-white appearance-none cursor-pointer focus:outline-none transition-all duration-300 ${Icon ? 'pl-10 sm:pl-12' : ''}`}
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
            >
                {children}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                <ChevronDown size={18} />
            </div>
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
    const [userType, setUserType] = useState(""); // "", "neristian", "outsider"
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
        let fieldValue = type === "checkbox" ? checked : value;

        // Auto-format rollNo: insert "/" after first 3 digits
        if (name === "rollNo") {
            let digits = value.replace(/[^0-9]/g, ""); // strip non-digits
            if (digits.length > 3) {
                fieldValue = digits.slice(0, 3) + "/" + digits.slice(3);
            } else {
                fieldValue = digits;
            }
        }

        const newFormData = {
            ...formData,
            [name]: fieldValue
        };

        // Auto-fill name from student list when rollNo is entered
        if (name === "rollNo") {
            const matchedName = studentList[fieldValue.trim()];
            if (matchedName) {
                newFormData.name = matchedName;
            }
        }

        setFormData(newFormData);
        setFormError({ ...formError, [name]: "" });
    };

    const handleUserTypeChange = (e) => {
        const value = e.target.value;
        
        if (value === "outsider") {
            navigate("/buy-ticket");
            return;
        }
        
        setUserType(value);
        setFormData({
            ...formData,
            isNeristianStudent: value === "neristian"
        });
        setFormError({});
    };

    const validateForm = () => {
        const errors = {};
        if (!userType) errors.userType = "Please select a user type";
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
            toast.success("OTP sent! Please check your email.");
            setStep(2);
        } else {
            toast.error(result.message || "Registration failed.");
        }
    };

    const handleVerifyOtp = async (e, otpValue = otp) => {
        if (e) e.preventDefault();
        if (!otpValue || otpValue.length !== 6) {
            setFormError({ otp: "Please enter a valid 6-digit OTP" });
            return;
        }

        const result = await verifyEmail(registrationEmail || formData.email, otpValue);
        if (result.success) {
            toast.success("Email verified successfully!");
            setStep(3);
        } else {
            toast.error(result.message || "Verification failed.");
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
                <div className="flex items-start sm:items-center justify-center min-h-screen px-3 pt-24 pb-8 sm:px-4 sm:pt-28 sm:pb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 max-w-lg w-full text-center bg-[#111111]"
                        style={{ border: `1px solid ${borderDefault}` }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6"
                        >
                            <Check className="text-white w-8 h-8 sm:w-10 sm:h-10" />
                        </motion.div>

                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4"
                            style={{ fontFamily: "Cirka, serif" }}
                        >
                            Registration Successful!
                        </motion.h2>

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6"
                            style={{ fontFamily: "Gilroy-Regular, sans-serif" }}
                        >
                            Thank you for registering for TEDxNERIST!
                        </motion.p>




                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-gray-400 text-xs sm:text-sm mb-6 sm:mb-8"
                            style={{ fontFamily: "Gilroy-Regular, sans-serif" }}
                        >
                            A confirmation email has been sent to your email address with the details.
                        </motion.p>

                        <motion.button
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleGoHome}
                            className="px-6 py-2.5 sm:px-8 sm:py-3 rounded-full font-medium transition-all text-white text-sm sm:text-base"
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

    // Step 2: OTP Verification
    if (step === 2) {
        return (
            <div className="min-h-screen bg-[#0a0a0a]">
                <Navbar />
                <div className="flex items-start sm:items-center justify-center min-h-screen px-3 pt-24 pb-8 sm:px-4 sm:pt-28 sm:pb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 max-w-md w-full bg-[#111111]"
                        style={{ border: `1px solid ${borderDefault}` }}
                    >
                        <button
                            onClick={() => { setStep(1); clearError(); }}
                            className="flex items-center text-gray-400 hover:text-white mb-4 sm:mb-6 transition-colors text-sm sm:text-base"
                            style={{ fontFamily: "Gilroy-Regular, sans-serif" }}
                        >
                            <ArrowLeft size={20} className="mr-2" />
                            Back
                        </button>

                        <h2
                            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2"
                            style={{ fontFamily: "Cirka, serif" }}
                        >
                            Verify Email
                        </h2>
                        <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8 break-all sm:break-normal" style={{ fontFamily: "Gilroy-Regular, sans-serif" }}>
                            We've sent a 6-digit OTP to <span style={{ color: tedxRed }}>{registrationEmail || formData.email}</span>
                        </p>

                        <form onSubmit={handleVerifyOtp} className="space-y-6">
                            <div>
                                <label
                                    className="block text-xs font-semibold tracking-[0.15em] uppercase mb-3"
                                    style={{ color: tedxRed, fontFamily: "Gilroy-Medium, sans-serif" }}
                                >
                                    Enter OTP
                                </label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                                        setOtp(val);
                                        setFormError({ ...formError, otp: "" });
                                        if (val.length === 6) {
                                            handleVerifyOtp(null, val);
                                        }
                                    }}
                                    placeholder="000000"
                                    className="w-full bg-[#141414] border rounded-xl px-3 py-3 sm:px-4 sm:py-4 text-white text-center text-xl sm:text-2xl tracking-[0.3em] sm:tracking-[0.5em] focus:outline-none transition-all duration-300"
                                    style={{
                                        borderColor: borderDefault,
                                        fontFamily: "Gilroy, sans-serif",
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = tedxRed;
                                        e.target.style.boxShadow = `0 0 0 3px ${tedxRedSubtle}`;
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = borderDefault;
                                        e.target.style.boxShadow = 'none';
                                    }}
                                    maxLength={6}
                                />
                                {formError.otp && (
                                    <p className="text-red-400 text-sm mt-2" style={{ fontFamily: "Gilroy-Regular, sans-serif" }}>{formError.otp}</p>
                                )}
                                {error && (
                                    <p className="text-red-400 text-sm mt-2" style={{ fontFamily: "Gilroy-Regular, sans-serif" }}>{error}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || otp.length !== 6}
                                className="w-full disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-3 sm:py-4 rounded-xl font-medium text-sm sm:text-base transition-all flex items-center justify-center gap-2"
                                style={{
                                    backgroundColor: isLoading || otp.length !== 6 ? undefined : tedxRed,
                                    fontFamily: "Gilroy-Medium, sans-serif",
                                }}
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
                <Footer />
            </div>
        );
    }

    // Step 1: Registration Form
    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            <Navbar />
            <div className="flex items-start sm:items-center justify-center min-h-screen px-3 pt-24 pb-8 sm:px-4 sm:pt-28 sm:pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 max-w-2xl w-full bg-[#111111]"
                    style={{ border: `1px solid ${borderDefault}` }}
                >
                    {/* Header */}
                    <motion.h2
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-2"
                        style={{ fontFamily: "Cirka, serif" }}
                    >
                        Register
                    </motion.h2>
                    <motion.p
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-10"
                        style={{ fontFamily: "Gilroy-Regular, sans-serif" }}
                    >
                        Register for <span style={{ color: tedxRed, fontWeight: 700 }}>TEDx</span>NERIST — an event filled with ideas worth spreading
                    </motion.p>

                    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-7">
                        {/* User Type Select — always visible */}
                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <StyledSelect
                                label="User Type"
                                icon={User}
                                value={userType}
                                onChange={handleUserTypeChange}
                                error={formError.userType}
                            >
                                <option value="">Select User Type</option>
                                <option value="neristian">NERIST Student</option>
                                <option value="outsider">Outside Attendee</option>
                            </StyledSelect>
                        </motion.div>

                        {/* Registration fields — only visible after selecting user type */}
                        <AnimatePresence>
                            {userType && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className="space-y-5 sm:space-y-7 overflow-hidden"
                                    key="registration-fields"
                                >
                                    {/* NERIST Student layout: Roll No + Name, Dept + Year, Email + WhatsApp */}
                                    {userType === "neristian" ? (
                                        <>
                                            {/* Row 1: Roll No + Full Name */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
                                                <StyledInput
                                                    label="Reg. No"
                                                    icon={Hash}
                                                    type="text"
                                                    name="rollNo"
                                                    value={formData.rollNo}
                                                    onChange={handleChange}
                                                    placeholder="e.g. 223/037"
                                                    error={formError.rollNo}
                                                />
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
                                            </div>

                                            {/* Row 2: Department + Year */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
                                                <StyledSelect
                                                    label="Department"
                                                    icon={Building2}
                                                    name="department"
                                                    value={formData.department}
                                                    onChange={handleChange}
                                                    error={formError.department}
                                                >
                                                    <option value="">Select Department</option>
                                                    <option value="CSE">Computer Science Engineering</option>
                                                    <option value="ECE">Electronics & Communication Engineering</option>
                                                    <option value="EE">Electrical Engineering</option>
                                                    <option value="ME">Mechanical Engineering</option>
                                                    <option value="CE">Civil Engineering</option>
                                                    <option value="AGR">Agricultural Engineering</option>
                                                    <option value="FOR">Forestry</option>
                                                </StyledSelect>

                                                <StyledSelect
                                                    label="Year"
                                                    icon={Calendar}
                                                    name="year"
                                                    value={formData.year}
                                                    onChange={handleChange}
                                                    error={formError.year}
                                                >
                                                    <option value="">Select Year</option>
                                                    <option value="BASE 1st">BASE 1st</option>
                                                    <option value="BASE 2nd">BASE 2nd</option>
                                                    <option value="BTECH 1st">BTECH 1st</option>
                                                    <option value="BTECH 2nd">BTECH 2nd</option>
                                                    <option value="BTECH 3rd">BTECH 3rd</option>
                                                    <option value="BTECH 4th">BTECH 4th</option>
                                                </StyledSelect>
                                            </div>

                                            {/* Row 3: Email + WhatsApp */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
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
                                                    label="WhatsApp Number"
                                                    icon={Phone}
                                                    type="tel"
                                                    name="whatsappNumber"
                                                    value={formData.whatsappNumber}
                                                    onChange={handleChange}
                                                    placeholder="9876543210"
                                                    error={formError.whatsappNumber}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        /* Outsider layout: Name full width, Email + WhatsApp side by side */
                                        <>
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

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
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
                                                    label="WhatsApp Number"
                                                    icon={Phone}
                                                    type="tel"
                                                    name="whatsappNumber"
                                                    value={formData.whatsappNumber}
                                                    onChange={handleChange}
                                                    placeholder="9876543210"
                                                    error={formError.whatsappNumber}
                                                />
                                            </div>
                                        </>
                                    )}

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
                                        transition={{ delay: 0.2 }}
                                        whileHover={{ scale: 1.02, boxShadow: `0 8px 30px ${tedxRedDim}` }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-3 sm:py-4 rounded-xl font-medium text-sm sm:text-base transition-all flex items-center justify-center gap-2"
                                        style={{
                                            backgroundColor: isLoading ? undefined : tedxRed,
                                            fontFamily: "Gilroy-Medium, sans-serif",
                                        }}
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
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
}
