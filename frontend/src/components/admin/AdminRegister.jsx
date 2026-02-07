import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/authStore";
import "../../css/Admin.css";

const AdminRegister = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const { registerAdmin, isLoading, error, clearError } = useAuthStore();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) clearError();
    };

    const validateForm = () => {
        if (!formData.email || !formData.password || !formData.confirmPassword) {
            return "All fields are required";
        }
        if (!formData.email.includes("@")) {
            return "Please enter a valid email address";
        }
        if (formData.password.length < 6) {
            return "Password must be at least 6 characters";
        }
        if (formData.password !== formData.confirmPassword) {
            return "Passwords do not match";
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        clearError();

        const validationError = validateForm();
        if (validationError) {
            // Set error manually
            useAuthStore.setState({ error: validationError });
            return;
        }

        const result = await registerAdmin(formData.email, formData.password);
        if (result.success) {
            setSuccessMessage("Admin registered successfully! Redirecting to login...");
            setTimeout(() => {
                navigate("/admin/login");
            }, 2000);
        }
    };

    return (
        <div className="admin-login-container">
            {/* Background effects */}
            <div className="admin-bg-gradient"></div>
            <div className="admin-bg-grid"></div>

            <motion.div
                className="admin-login-card"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Logo */}
                <div className="admin-login-logo">
                    <img src="/logo_wl.webp" alt="TEDxNERIST" />
                </div>

                <div className="admin-login-header">
                    <h1>Create Admin Account</h1>
                    <p>Register a new admin for TEDxNERIST</p>
                </div>

                <form onSubmit={handleSubmit} className="admin-login-form">
                    {error && (
                        <motion.div
                            className="admin-error"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <i className="fas fa-exclamation-circle"></i>
                            {error}
                        </motion.div>
                    )}

                    {successMessage && (
                        <motion.div
                            className="admin-success"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <i className="fas fa-check-circle"></i>
                            {successMessage}
                        </motion.div>
                    )}

                    <div className="admin-input-group">
                        <label htmlFor="email">
                            <i className="fas fa-envelope"></i>
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="admin@tedxnerist.com"
                            required
                        />
                    </div>

                    <div className="admin-input-group">
                        <label htmlFor="password">
                            <i className="fas fa-lock"></i>
                            Password
                        </label>
                        <div className="password-input-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                            </button>
                        </div>
                        <span className="input-hint">Must be at least 6 characters</span>
                    </div>

                    <div className="admin-input-group">
                        <label htmlFor="confirmPassword">
                            <i className="fas fa-lock"></i>
                            Confirm Password
                        </label>
                        <div className="password-input-wrapper">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                <i className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="admin-login-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner"></span>
                                Creating Account...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-user-plus"></i>
                                Create Admin Account
                            </>
                        )}
                    </button>
                </form>

                <div className="admin-login-footer">
                    <p className="footer-text">
                        Already have an account?{" "}
                        <Link to="/admin/login" className="link-highlight">
                            Sign In
                        </Link>
                    </p>
                    <a href="/">
                        <i className="fas fa-arrow-left"></i>
                        Back to Home
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminRegister;
