import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../../store/authStore";

const ToolsTab = () => {
    const { sendBulkEmail, stats } = useAuthStore();

    // Bulk email state
    const [emailSubject, setEmailSubject] = useState("");
    const [emailBody, setEmailBody] = useState("");
    const [sending, setSending] = useState(false);
    const [emailResult, setEmailResult] = useState(null);
    const [confirmSend, setConfirmSend] = useState(false);

    const handleSendBulkEmail = async () => {
        if (!emailSubject.trim() || !emailBody.trim()) return;
        setSending(true);
        setEmailResult(null);

        // Wrap plain text in basic HTML if it doesn't contain HTML tags
        let content = emailBody;
        if (!content.includes("<")) {
            content = `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: #000; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
                    <h2 style="color: #fff; margin: 0;">TED<span style="color: #e62b1e;">x</span>NERIST</h2>
                </div>
                <div style="padding: 24px; background: #fff; border: 1px solid #eee; border-radius: 0 0 8px 8px;">
                    <p>Hi {name},</p>
                    ${content.split("\n").map(line => `<p>${line}</p>`).join("")}
                    <p style="margin-top: 24px; color: #666; font-size: 13px;">— The TEDxNERIST Team</p>
                </div>
            </div>`;
        }

        const result = await sendBulkEmail(emailSubject, content);
        setSending(false);
        setConfirmSend(false);
        setEmailResult(result);
        if (result.success) {
            setEmailSubject("");
            setEmailBody("");
        }
    };

    const templates = [
        {
            name: "Event Reminder",
            subject: "Reminder: TEDxNERIST Event Tomorrow! 🎤",
            body: `We're excited to remind you that TEDxNERIST is happening tomorrow!\n\nPlease arrive at the venue by 9:00 AM with your ticket ID ready.\n\nDon't forget to bring your college ID card.\n\nSee you there!`
        },
        {
            name: "Schedule Update",
            subject: "TEDxNERIST: Event Schedule Update 📋",
            body: `Important update regarding the TEDxNERIST event schedule.\n\nPlease check our website for the latest speaker lineup and timings.\n\nWe look forward to seeing you!`
        },
        {
            name: "Thank You",
            subject: "Thank You for Attending TEDxNERIST! 🙏",
            body: `Thank you for being part of TEDxNERIST!\n\nWe hope you enjoyed the talks and took away some ideas worth spreading.\n\nYour feedback means a lot to us. Please take a moment to share your experience.`
        }
    ];

    return (
        <motion.div
            key="tools"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="tools-content"
        >
            <header className="content-header">
                <div>
                    <h1>Tools</h1>
                    <p>Bulk email & event utilities</p>
                </div>
            </header>

            {/* Bulk Email Section */}
            <motion.div
                className="tools-section"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <div className="tools-section-header">
                    <div>
                        <h3><i className="fas fa-paper-plane"></i> Bulk Email</h3>
                        <p>Send emails to all {stats?.verifiedRegistrations || 0} verified attendees. Use <code>{"{name}"}</code> for personalization.</p>
                    </div>
                </div>

                {/* Templates */}
                <div className="template-chips">
                    {templates.map((t, i) => (
                        <button
                            key={i}
                            className="template-chip"
                            onClick={() => { setEmailSubject(t.subject); setEmailBody(t.body); }}
                        >
                            <i className="fas fa-file-alt"></i> {t.name}
                        </button>
                    ))}
                </div>

                <div className="email-form">
                    <div className="email-field">
                        <label><i className="fas fa-heading"></i> Subject</label>
                        <input
                            type="text"
                            value={emailSubject}
                            onChange={e => setEmailSubject(e.target.value)}
                            placeholder="Email subject line..."
                        />
                    </div>
                    <div className="email-field">
                        <label><i className="fas fa-align-left"></i> Body</label>
                        <textarea
                            value={emailBody}
                            onChange={e => setEmailBody(e.target.value)}
                            placeholder="Email body (plain text or HTML)..."
                            rows={8}
                        />
                    </div>

                    <div className="email-actions">
                        {!confirmSend ? (
                            <button
                                className="send-btn"
                                disabled={!emailSubject.trim() || !emailBody.trim() || sending}
                                onClick={() => setConfirmSend(true)}
                            >
                                <i className="fas fa-paper-plane"></i>
                                Send to {stats?.verifiedRegistrations || 0} Attendees
                            </button>
                        ) : (
                            <div className="confirm-bar">
                                <span className="confirm-text">
                                    <i className="fas fa-exclamation-triangle"></i>
                                    Send to <strong>{stats?.verifiedRegistrations || 0}</strong> verified attendees?
                                </span>
                                <button className="confirm-yes" onClick={handleSendBulkEmail} disabled={sending}>
                                    {sending ? <><span className="spinner"></span> Sending...</> : <><i className="fas fa-check"></i> Confirm</>}
                                </button>
                                <button className="confirm-no" onClick={() => setConfirmSend(false)} disabled={sending}>
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <AnimatePresence>
                    {emailResult && (
                        <motion.div
                            className={`email-result ${emailResult.success ? "success" : "error"}`}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            <i className={`fas ${emailResult.success ? "fa-check-circle" : "fa-times-circle"}`}></i>
                            <div>
                                <strong>{emailResult.success ? "Emails Sent" : "Failed"}</strong>
                                <p>{emailResult.message}</p>
                                {emailResult.success && (
                                    <p className="result-stats">
                                        ✓ {emailResult.sent} sent · ✗ {emailResult.failed} failed
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Quick Info */}
            <motion.div
                className="tools-section"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <div className="tools-section-header">
                    <h3><i className="fas fa-info-circle"></i> Quick Reference</h3>
                </div>
                <div className="info-grid">
                    <div className="info-card">
                        <h4>Email Variables</h4>
                        <ul>
                            <li><code>{"{name}"}</code> — Attendee's name</li>
                            <li><code>{"{email}"}</code> — Attendee's email</li>
                        </ul>
                    </div>
                    <div className="info-card">
                        <h4>Ticket Format</h4>
                        <ul>
                            <li>Format: <code>TEDX-XXXXXXXX</code></li>
                            <li>8 alphanumeric characters</li>
                        </ul>
                    </div>
                    <div className="info-card">
                        <h4>Check-in Flow</h4>
                        <ul>
                            <li>Enter ticket ID manually</li>
                            <li>Only verified users can check in</li>
                            <li>Duplicate check-ins are blocked</li>
                        </ul>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ToolsTab;
