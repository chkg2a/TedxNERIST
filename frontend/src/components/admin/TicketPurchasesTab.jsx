import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../../store/authStore";
import { DeleteModal } from "./Modals";
import "../../css/Admin.css";

const TicketPurchasesTab = () => {
    const { purchasedTickets, fetchPurchasedTickets, deletePurchasedTicket, isLoading } = useAuthStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const handleDelete = async (id) => {
        await deletePurchasedTicket(id);
        setDeleteConfirm(null);
    };

    useEffect(() => {
        fetchPurchasedTickets();
    }, [fetchPurchasedTickets]);

    const filteredTickets = purchasedTickets?.filter(ticket =>
        ticket.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.ticketId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.contactNumber?.includes(searchTerm)
    ) || [];

    if (isLoading && !purchasedTickets?.length) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="dashboard-tab"
            >
                <div className="loading-spinner"></div>
                <p>Loading ticket purchases...</p>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="dashboard-tab"
        >
            <div className="tab-header">
                <h2>Ticket Purchases</h2>
                <div className="header-actions">
                    <button className="export-btn" onClick={() => fetchPurchasedTickets()}>
                        <i className="fas fa-sync-alt"></i> Refresh
                    </button>
                </div>
            </div>

            <div className="controls-grid">
                <div className="search-box">
                    <i className="fas fa-search"></i>
                    <input
                        type="text"
                        placeholder="Search by name, email, phone, or ticket ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Ticket ID</th>
                            <th>Name</th>
                            <th>Contact</th>
                            <th>Type</th>
                            <th>Details</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTickets.map((ticket) => (
                            <tr key={ticket._id}>
                                <td>
                                    <span className="badge info">{ticket.ticketId || "N/A"}</span>
                                </td>
                                <td>
                                    <div className="user-cell">
                                        <div className="user-meta">{ticket.name}</div>
                                        <div className="user-email">{ticket.email}</div>
                                    </div>
                                </td>
                                <td>{ticket.contactNumber}</td>
                                <td>
                                    <span className={`badge ${ticket.ticketType === 'vip' ? 'warning' : 'primary'}`}>
                                        {ticket.ticketType?.toUpperCase() || "GENERAL"}
                                    </span>
                                </td>
                                <td>
                                    <div>Qty: {ticket.quantity}</div>
                                    <div className="user-meta">₹{ticket.amount}</div>
                                </td>
                                <td>
                                    <span className={`status-badge ${ticket.paymentStatus === 'completed' ? 'verified' : ticket.paymentStatus === 'pending' ? 'pending' : 'failed'}`}>
                                        {ticket.paymentStatus?.toUpperCase() || "PENDING"}
                                    </span>
                                </td>
                                <td>
                                    {ticket.checkedIn ? (
                                        <span className="status-badge check-in">Checked In</span>
                                    ) : (
                                        <span className="status-badge pending">Not Checked In</span>
                                    )}
                                </td>
                                <td>
                                    {new Date(ticket.createdAt).toLocaleDateString()}
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button 
                                            className="action-btn delete" 
                                            title="Delete Ticket"
                                            onClick={() => setDeleteConfirm(ticket)}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredTickets.length === 0 && (
                            <tr>
                                <td colSpan="9" className="empty-state">
                                    <i className="fas fa-inbox"></i>
                                    <p>No ticket purchases found.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <AnimatePresence>
                {deleteConfirm && (
                    <DeleteModal 
                        reg={deleteConfirm} 
                        onClose={() => setDeleteConfirm(null)} 
                        onDelete={handleDelete} 
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default TicketPurchasesTab;
