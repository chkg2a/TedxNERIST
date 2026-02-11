import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../../store/authStore";
import DashboardTab from "./DashboardTab";
import RegistrationsTab from "./RegistrationsTab";
import CheckInTab from "./CheckInTab";
import { RegistrationModal, DeleteModal } from "./Modals";
import "../../css/Admin.css";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const {
        admin, isAuthenticated, isLoading, stats, registrations, pagination,
        fetchStats, fetchRegistrations, searchRegistrations, deleteRegistration,
        checkInUser, exportRegistrations, logout
    } = useAuthStore();

    const [activeTab, setActiveTab] = useState("dashboard");
    const [searchQuery, setSearchQuery] = useState("");
    const [ticketId, setTicketId] = useState("");
    const [checkInResult, setCheckInResult] = useState(null);
    const [selectedRegistration, setSelectedRegistration] = useState(null);
    const [filters, setFilters] = useState({ verified: "", department: "", year: "" });
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    useEffect(() => {
        if (isAuthenticated) {
            fetchStats();
            fetchRegistrations();
        }
    }, [isAuthenticated, fetchStats, fetchRegistrations]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (searchQuery.length >= 2) await searchRegistrations(searchQuery);
        else if (searchQuery.length === 0) await fetchRegistrations();
    };

    const handleFilter = async () => {
        await fetchRegistrations({
            verified: filters.verified || undefined,
            department: filters.department || undefined,
            year: filters.year || undefined
        });
    };

    const handleCheckIn = async (e) => {
        e.preventDefault();
        setCheckInResult(null);
        const result = await checkInUser(ticketId);
        setCheckInResult(result);
        if (result.success) { setTicketId(""); fetchStats(); }
    };

    const handleDelete = async (id) => {
        const result = await deleteRegistration(id);
        if (result.success) { setDeleteConfirm(null); fetchStats(); }
    };

    const handleExport = async () => {
        const result = await exportRegistrations();
        if (result.success && result.registrations) {
            const headers = ["Name", "Email", "WhatsApp", "Department", "Roll No", "Year", "Ticket ID", "NERIST Student", "Checked In", "Check-in Time", "Registered At"];
            const csvData = result.registrations.map(r => [
                r.name, r.email, r.whatsappNumber, r.department || "", r.rollNo || "", r.year || "",
                r.ticketId, r.isNeristianStudent ? "Yes" : "No", r.checkedIn ? "Yes" : "No",
                r.checkedInAt ? new Date(r.checkedInAt).toLocaleString() : "", new Date(r.createdAt).toLocaleString()
            ]);
            const csv = [headers, ...csvData].map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");
            const blob = new Blob([csv], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a"); a.href = url;
            a.download = `registrations_${new Date().toISOString().split("T")[0]}.csv`;
            a.click(); URL.revokeObjectURL(url);
        }
    };

    const handleLogout = async () => { await logout(); navigate("/admin/login"); };
    const handlePageChange = (page) => fetchRegistrations({ page, ...filters });

    if (!isAuthenticated && isLoading) {
        return <div className="admin-loading"><div className="loading-spinner"></div><p>Loading...</p></div>;
    }

    return (
        <div className="admin-dashboard">
            <aside className="admin-sidebar">
                <div className="sidebar-logo"><img src="/logo_wl.webp" alt="TEDxNERIST" /><span>Admin</span></div>
                <nav className="sidebar-nav">
                    <button className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`} onClick={() => setActiveTab("dashboard")}>
                        <i className="fas fa-chart-line"></i>Dashboard
                    </button>
                    <button className={`nav-item ${activeTab === "registrations" ? "active" : ""}`} onClick={() => setActiveTab("registrations")}>
                        <i className="fas fa-users"></i>Registrations
                    </button>
                    <button className={`nav-item ${activeTab === "checkin" ? "active" : ""}`} onClick={() => setActiveTab("checkin")}>
                        <i className="fas fa-qrcode"></i>Check-In
                    </button>
                </nav>
                <div className="sidebar-footer">
                    <div className="admin-info"><i className="fas fa-user-shield"></i><span>{admin?.email?.split("@")[0] || "Admin"}</span></div>
                    <button className="logout-btn" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i>Logout</button>
                </div>
            </aside>

            <main className="admin-main">
                <AnimatePresence mode="wait">
                    {activeTab === "dashboard" && <DashboardTab stats={stats} admin={admin} />}
                    {activeTab === "registrations" && (
                        <RegistrationsTab
                            registrations={registrations} pagination={pagination} searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery} handleSearch={handleSearch} filters={filters}
                            setFilters={setFilters} handleFilter={handleFilter} handleExport={handleExport}
                            handlePageChange={handlePageChange} setSelectedRegistration={setSelectedRegistration}
                            setDeleteConfirm={setDeleteConfirm}
                        />
                    )}
                    {activeTab === "checkin" && (
                        <CheckInTab
                            ticketId={ticketId} setTicketId={setTicketId} handleCheckIn={handleCheckIn}
                            checkInResult={checkInResult} isLoading={isLoading} stats={stats}
                        />
                    )}
                </AnimatePresence>
            </main>

            <AnimatePresence>
                {selectedRegistration && <RegistrationModal reg={selectedRegistration} onClose={() => setSelectedRegistration(null)} />}
                {deleteConfirm && <DeleteModal reg={deleteConfirm} onClose={() => setDeleteConfirm(null)} onDelete={handleDelete} />}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
