import { motion } from "framer-motion";

const RegistrationModal = ({ reg, onClose }) => {
    return (
        <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="modal-content"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
            >
                <button className="modal-close" onClick={onClose}>
                    <i className="fas fa-times"></i>
                </button>
                <h2>Registration Details</h2>
                <div className="detail-grid">
                    <div className="detail-item"><label>Name</label><span>{reg.name}</span></div>
                    <div className="detail-item"><label>Email</label><span>{reg.email}</span></div>
                    <div className="detail-item"><label>WhatsApp</label><span>{reg.whatsappNumber}</span></div>
                    <div className="detail-item"><label>Department</label><span>{reg.department || "N/A"}</span></div>
                    <div className="detail-item"><label>Roll No</label><span>{reg.rollNo || "N/A"}</span></div>
                    <div className="detail-item"><label>Year</label><span>{reg.year || "N/A"}</span></div>
                    <div className="detail-item"><label>Ticket ID</label><span><code>{reg.ticketId || "N/A"}</code></span></div>
                    <div className="detail-item"><label>NERIST Student</label><span>{reg.isNeristianStudent ? "Yes" : "No"}</span></div>
                    <div className="detail-item">
                        <label>Verified</label>
                        <span className={reg.isVerified ? "text-green" : "text-yellow"}>{reg.isVerified ? "Yes" : "No"}</span>
                    </div>
                    <div className="detail-item"><label>Checked In</label><span>{reg.checkedIn ? "Yes" : "No"}</span></div>
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="modal-content delete-modal"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="delete-icon"><i className="fas fa-exclamation-triangle"></i></div>
                <h2>Confirm Delete</h2>
                <p>Are you sure you want to delete the registration for <strong>{reg.name}</strong>?</p>
                <p className="warning">This action cannot be undone.</p>
                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>Cancel</button>
                    <button className="delete-confirm-btn" onClick={() => onDelete(reg._id)}>Delete</button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export { RegistrationModal, DeleteModal };
