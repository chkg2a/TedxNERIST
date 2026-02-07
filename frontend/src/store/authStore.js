import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = import.meta.env.VITE_BACK_URL || "http://localhost:3000";

export const useAuthStore = create((set, get) => ({
    // State
    admin: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    // Registrations state
    registrations: [],
    pagination: null,
    stats: null,

    // User state (for registration flow)
    registrationEmail: null,
    isRegistered: false,
    ticketId: null,

    // ============ USER REGISTRATION (Public) ============

    // Register a new user (sends OTP to email)
    registerUser: async (userData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/api/auth/register`, userData);
            set({
                registrationEmail: userData.email,
                isLoading: false
            });
            return { success: true, message: response.data.message };
        } catch (error) {
            const message = error.response?.data?.message || "Registration failed";
            set({ isLoading: false, error: message });
            return { success: false, message };
        }
    },

    // Verify email with OTP
    verifyEmail: async (email, otp) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/api/auth/verify-email`, {
                email,
                otp
            });
            set({
                isRegistered: true,
                ticketId: response.data.ticketId,
                isLoading: false
            });
            return { success: true, ticketId: response.data.ticketId };
        } catch (error) {
            const message = error.response?.data?.message || "Verification failed";
            set({ isLoading: false, error: message });
            return { success: false, message };
        }
    },

    // Reset registration state
    resetRegistration: () => set({
        registrationEmail: null,
        isRegistered: false,
        ticketId: null,
        error: null
    }),

    // ============ ADMIN AUTHENTICATION ============

    // Register a new admin
    registerAdmin: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/api/admin/register`, {
                email,
                password
            });
            set({ isLoading: false });
            return { success: true, message: response.data.message };
        } catch (error) {
            const message = error.response?.data?.message || "Registration failed";
            set({ isLoading: false, error: message });
            return { success: false, message };
        }
    },

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/api/admin/login`, {
                email,
                password
            });
            set({
                admin: response.data.admin,
                isAuthenticated: true,
                isLoading: false
            });
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || "Login failed";
            set({ isLoading: false, error: message });
            return { success: false, message };
        }
    },

    logout: async () => {
        set({ isLoading: true });
        try {
            await axios.post(`${API_URL}/api/admin/logout`);
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            set({
                admin: null,
                isAuthenticated: false,
                isLoading: false,
                registrations: [],
                pagination: null,
                stats: null
            });
        }
    },

    checkAuth: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.get(`${API_URL}/api/admin/me`);
            set({
                admin: response.data.admin,
                isAuthenticated: true,
                isLoading: false
            });
            return true;
        } catch (error) {
            set({
                admin: null,
                isAuthenticated: false,
                isLoading: false
            });
            return false;
        }
    },

    refreshToken: async () => {
        try {
            await axios.post(`${API_URL}/api/admin/refresh-token`);
            return true;
        } catch (error) {
            set({ admin: null, isAuthenticated: false });
            return false;
        }
    },

    // Dashboard Stats
    fetchStats: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/api/admin/stats`);
            set({ stats: response.data.stats, isLoading: false });
            return { success: true, stats: response.data.stats };
        } catch (error) {
            const message = error.response?.data?.message || "Failed to fetch stats";
            set({ isLoading: false, error: message });
            return { success: false, message };
        }
    },

    // Registrations Management
    fetchRegistrations: async (params = {}) => {
        set({ isLoading: true, error: null });
        try {
            const queryParams = new URLSearchParams();
            if (params.page) queryParams.append("page", params.page);
            if (params.limit) queryParams.append("limit", params.limit);
            if (params.verified !== undefined) queryParams.append("verified", params.verified);
            if (params.department) queryParams.append("department", params.department);
            if (params.year) queryParams.append("year", params.year);

            const response = await axios.get(
                `${API_URL}/api/admin/registrations?${queryParams.toString()}`
            );
            set({
                registrations: response.data.registrations,
                pagination: response.data.pagination,
                isLoading: false
            });
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || "Failed to fetch registrations";
            set({ isLoading: false, error: message });
            return { success: false, message };
        }
    },

    searchRegistrations: async (query) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${API_URL}/api/admin/registrations/search?q=${encodeURIComponent(query)}`
            );
            set({
                registrations: response.data.registrations,
                pagination: null,
                isLoading: false
            });
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || "Search failed";
            set({ isLoading: false, error: message });
            return { success: false, message };
        }
    },

    getRegistrationById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/api/admin/registrations/${id}`);
            return { success: true, registration: response.data.registration };
        } catch (error) {
            const message = error.response?.data?.message || "Failed to fetch registration";
            return { success: false, message };
        }
    },

    deleteRegistration: async (id) => {
        try {
            await axios.delete(`${API_URL}/api/admin/registrations/${id}`);
            // Remove from local state
            set(state => ({
                registrations: state.registrations.filter(r => r._id !== id)
            }));
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || "Failed to delete registration";
            return { success: false, message };
        }
    },

    // Check-in
    checkInUser: async (ticketId) => {
        try {
            const response = await axios.post(`${API_URL}/api/admin/check-in`, { ticketId });
            return { success: true, registration: response.data.registration };
        } catch (error) {
            const message = error.response?.data?.message || "Check-in failed";
            return { success: false, message, checkedInAt: error.response?.data?.checkedInAt };
        }
    },

    // Export
    exportRegistrations: async () => {
        try {
            const response = await axios.get(`${API_URL}/api/admin/registrations/export`);
            return { success: true, registrations: response.data.registrations };
        } catch (error) {
            const message = error.response?.data?.message || "Export failed";
            return { success: false, message };
        }
    },

    // Clear error
    clearError: () => set({ error: null })
}));
