import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/authStore";
import "../../css/Admin.css";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { login, isLoading, error, clearError } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearError();
        const result = await login(email, password);
        if (result.success) {
            navigate("/admin/dashboard");
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
                    <h1>Admin Portal</h1>
                    <p>Sign in to manage registrations</p>
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

                    <div className="admin-input-group">
                        <label htmlFor="email">
                            <i className="fas fa-envelope"></i>
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                    </div>

                    <button
                        type="submit"
                        className="admin-login-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner"></span>
                                Signing in...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-sign-in-alt"></i>
                                Sign In
                            </>
                        )}
                    </button>
                </form>

                <div className="admin-login-footer">
                    <p className="footer-text">
                        Don't have an account?{" "}
                        <Link to="/admin/register" className="link-highlight">
                            Create Account
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

export default AdminLogin;
