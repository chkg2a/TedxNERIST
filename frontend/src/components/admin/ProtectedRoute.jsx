import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

/**
 * ProtectedRoute - Guards admin routes from unauthenticated access.
 *
 * How it works:
 * 1. Shows a loading spinner while checking authentication.
 * 2. If the user is authenticated → renders the child component.
 * 3. If not authenticated → redirects to /admin/login.
 *
 * Usage:
 *   <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
 */
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, checkAuth } = useAuthStore();
    const [isChecking, setIsChecking] = useState(true);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const verify = async () => {
            try {
                const result = await checkAuth();
                setIsValid(result);
            } catch {
                setIsValid(false);
            } finally {
                setIsChecking(false);
            }
        };
        verify();
    }, [checkAuth]);

    // Show loading while verifying auth
    if (isChecking) {
        return (
            <div className="admin-loading">
                <div className="loading-spinner"></div>
                <p>Verifying access...</p>
            </div>
        );
    }

    // Not authenticated → redirect
    if (!isValid && !isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    // Authenticated → render children
    return children;
};

export default ProtectedRoute;
