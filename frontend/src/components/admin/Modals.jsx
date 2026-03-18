import { motion } from "framer-motion";

const overlay = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
};

const modal = {
    hidden: { scale: 0.92, opacity: 0, y: 20 },
    visible: { scale: 1, opacity: 1, y: 0, transition: { type: "spring", damping: 25, stiffness: 300 } },
    exit: { scale: 0.92, opacity: 0, y: 20 }
};

const RegistrationModal = ({ reg, onClose }) => {
    return (
        <motion.div
            className="modal-overlay"
            variants={overlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
        >
            <motion.div
                className="modal-content"
                variants={modal}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="modal-close" onClick={onClose}>
                    <i className="fas fa-times"></i>
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                    <div style={{
                        width: 44, height: 44, borderRadius: 12,
                        background: 'linear-gradient(135deg, #e62b1e, #ff6b5b)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', fontWeight: 700, fontSize: 18, flexShrink: 0,
                        boxShadow: '0 4px 12px rgba(230, 43, 30, 0.25)'
                    }}>
                        {reg.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: 18 }}>{reg.name}</h2>
                        <p style={{ margin: '2px 0 0', fontSize: 13, color: 'var(--admin-text-muted)' }}>{reg.email}</p>
                    </div>
                </div>

                <div className="detail-grid">
                    <div className="detail-item"><label>WhatsApp</label><span>{reg.whatsappNumber}</span></div>
                    <div className="detail-item"><label>Department</label><span>{reg.department || "N/A"}</span></div>
                    <div className="detail-item"><label>Roll No</label><span>{reg.rollNo || "N/A"}</span></div>
                    <div className="detail-item"><label>Year</label><span>{reg.year || "N/A"}</span></div>
                    <div className="detail-item"><label>Ticket ID</label><span><code>{reg.ticketId || "N/A"}</code></span></div>
                    <div className="detail-item"><label>NERIST Student</label><span>{reg.isNeristianStudent ? "Yes" : "No"}</span></div>
                    <div className="detail-item">
                        <label>Verified</label>
                        <span className={reg.isVerified ? "text-green" : "text-yellow"}>{reg.isVerified ? "✓ Yes" : "○ No"}</span>
                    </div>
                    <div className="detail-item"><label>Checked In</label><span>{reg.checkedIn ? "✓ Yes" : "○ No"}</span></div>
                    {reg.checkedInAt && (
                        <div className="detail-item full"><label>Check-in Time</label><span>{new Date(reg.checkedInAt).toLocaleString()}</span></div>
                    )}
                    <div className="detail-item full"><label>Registered At</label><span>{new Date(reg.createdAt).toLocaleString()}</span></div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const DeleteModal = ({ reg, onClose, onDelete }) => {
    return (
        <motion.div
            className="modal-overlay"
            variants={overlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
        >
            <motion.div
                className="modal-content delete-modal"
                variants={modal}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="delete-icon">
                    <i className="fas fa-exclamation-triangle"></i>
                </div>
                <h2>Confirm Delete</h2>
                <p>Are you sure you want to delete the registration for <strong>{reg.name}</strong>?</p>
                <p className="warning">This action cannot be undone.</p>
                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>Cancel</button>
                    <button className="delete-confirm-btn" onClick={() => onDelete(reg._id)}>
                        <i className="fas fa-trash" style={{ marginRight: 6, fontSize: 12 }}></i>
                        Delete
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export { RegistrationModal, DeleteModal };
