import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/authStore";

const CheckedInListTab = () => {
    const { fetchCheckedInList } = useAuthStore();
    const [checkedInUsers, setCheckedInUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const res = await fetchCheckedInList();
            if (res.success) {
                setCheckedInUsers(res.list);
            }
            setIsLoading(false);
        };
        loadData();
    }, [fetchCheckedInList]);

    const handleExport = () => {
        if (!checkedInUsers.length) return;
        const headers = ["Name", "Email", "Phone", "Ticket ID", "Type", "Check-in Time"];
        const csvData = checkedInUsers.map(u => [
            u.name,
            u.email,
            u.whatsappNumber || u.contactNumber || "-",
            u.ticketId,
            u.type,
            new Date(u.checkedInAt).toLocaleString()
        ]);
        const csv = [headers, ...csvData].map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `attendance_${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <motion.div
            key="checkedinlist"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="registrations-content" // Reuse table layout styles
        >
            <header className="content-header">
                <div>
                    <h1>Attendance Log</h1>
                    <p>{checkedInUsers.length} total attendees checked in across all databases</p>
                </div>
                <button className="export-btn" onClick={handleExport}>
                    <i className="fas fa-file-csv"></i> Export Logs
                </button>
            </header>

            {isLoading ? (
                <div style={{ textAlign: "center", padding: "40px" }}><div className="loading-spinner"></div></div>
            ) : (
                <motion.div
                    className="table-container"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.35 }}
                >
                    <table className="registrations-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Ticket ID</th>
                                <th>Ticket Type</th>
                                <th>Check-In Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {checkedInUsers.map((reg, index) => (
                                <motion.tr
                                    key={reg._id}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.03, duration: 0.25 }}
                                >
                                    <td>
                                        <div className="user-cell">
                                            <span className="user-avatar">{reg.name?.charAt(0)?.toUpperCase()}</span>
                                            {reg.name}
                                        </div>
                                    </td>
                                    <td>{reg.email}</td>
                                    <td style={{ fontFamily: "OverpassMono, monospace", letterSpacing: "1px" }}>{reg.ticketId}</td>
                                    <td>
                                        <span className={`status-badge ${reg.type === "NERIST" ? "verified" : "pending"}`}>
                                            {reg.type}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontSize: '13px' }}>{new Date(reg.checkedInAt).toLocaleDateString()}</span>
                                            <span style={{ fontSize: '11px', color: '#888' }}>{new Date(reg.checkedInAt).toLocaleTimeString()}</span>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>

                    {checkedInUsers.length === 0 && (
                        <div className="empty-state">
                            <i className="fas fa-ghost"></i>
                            <p>No one has been checked in yet!</p>
                        </div>
                    )}
                </motion.div>
            )}
        </motion.div>
    );
};

export default CheckedInListTab;
