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
            subject: "Reminder: TEDxNERIST Event Tomorrow",
            body: `
<!DOCTYPE html>
<html>
<body style="margin:0; padding:0; background:#f4f4f4;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 10px;">
<tr><td align="center">

<table width="600" style="background:#ffffff; border-radius:4px; overflow:hidden;">
  
  <!-- Header -->
  <tr>
    <td align="center" style="background:#000; padding:50px;">
      <h1 style="color:#EB0028; margin:0;">TED<span style="color:#fff;">x</span><span style="color:#fff;">NERIST</span></h1>
      <p style="color:#aaa; font-size:12px;">Ideas Worth Spreading</p>
    </td>
  </tr>

  <!-- Content -->
  <tr>
    <td style="padding:40px; font-family:Arial; color:#444;">
      
      <h2>Event Reminder</h2>

      <p>Dear \${name},</p>

      <p>
        Greetings from <strong>TEDxNERIST</strong>, hosted under the 
        North Eastern Regional Institute of Science and Technology (NERIST).
      </p>

      <p>
        This is a reminder that the TEDxNERIST event is scheduled for tomorrow.
      </p>

      <p>
        Please arrive at the venue by <strong>9:00 AM</strong> with your ticket ID ready.
        Kindly carry your valid college ID card for entry.
      </p>

      <p>
        We look forward to welcoming you to an inspiring experience.
      </p>

      <!-- CTA -->
      <div style="text-align:center; margin-top:30px;">
        <a href="\${platformUrl}" style="background:#EB0028; color:#fff; padding:12px 25px; text-decoration:none;">
          View Event Details
        </a>
      </div>

    </td>
  </tr>

  <!-- Closing -->
  <tr>
    <td style="padding:0 40px 40px; font-family:Arial;">
      Warm regards,<br>
      <strong>Team TEDxNERIST</strong><br>
      <span style="font-size:12px; color:#777;">
        North Eastern Regional Institute of Science and Technology (NERIST)
      </span>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td align="center" style="background:#1a1a1a; padding:30px; color:#aaa; font-size:11px;">
      © 2026 TEDxNERIST. All rights reserved.
    </td>
  </tr>

</table>

</td></tr>
</table>
</body>
</html>
`
        },

        {
            name: "Schedule Update",
            subject: "TEDxNERIST: Important Schedule Update",
            body: `
<!DOCTYPE html>
<html>
<body style="margin:0; padding:0; background:#f4f4f4;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 10px;">
<tr><td align="center">

<table width="600" style="background:#ffffff; border-radius:4px; overflow:hidden;">
  
  <!-- Header -->
  <tr>
    <td align="center" style="background:#000; padding:50px;">
      <h1 style="color:#EB0028; margin:0;">TED<span style="color:#fff;">x</span><span style="color:#fff;">NERIST</span></h1>
      <p style="color:#aaa; font-size:12px;">Ideas Worth Spreading</p>
    </td>
  </tr>

  <!-- Content -->
  <tr>
    <td style="padding:40px; font-family:Arial; color:#444;">
      
      <h2>Schedule Update</h2>

      <p>Dear \${name},</p>

      <p>
        Greetings from TEDxNERIST.
      </p>

      <p>
        Please note that there has been an update to the event schedule, including
        changes to speaker lineup and session timings.
      </p>

      <p>
        We request you to check the updated schedule on our platform.
      </p>

      <!-- CTA -->
      <div style="text-align:center; margin-top:30px;">
        <a href="\${platformUrl}" style="background:#EB0028; color:#fff; padding:12px 25px; text-decoration:none;">
          View Updated Schedule
        </a>
      </div>

    </td>
  </tr>

  <!-- Closing -->
  <tr>
    <td style="padding:0 40px 40px; font-family:Arial;">
      Warm regards,<br>
      <strong>Team TEDxNERIST</strong><br>
      <span style="font-size:12px; color:#777;">
        North Eastern Regional Institute of Science and Technology (NERIST)
      </span>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td align="center" style="background:#1a1a1a; padding:30px; color:#aaa; font-size:11px;">
      © 2026 TEDxNERIST. All rights reserved.
    </td>
  </tr>

</table>

</td></tr>
</table>
</body>
</html>
`
        },

        {
            name: "Thank You",
            subject: "Thank You for Attending TEDxNERIST",
            body: `
<!DOCTYPE html>
<html>
<body style="margin:0; padding:0; background:#f4f4f4;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 10px;">
<tr><td align="center">

<table width="600" style="background:#ffffff; border-radius:4px; overflow:hidden;">
  
  <!-- Header -->
  <tr>
    <td align="center" style="background:#000; padding:50px;">
      <h1 style="color:#EB0028; margin:0;">TED<span style="color:#fff;">x</span><span style="color:#fff;">NERIST</span></h1>
      <p style="color:#aaa; font-size:12px;">Ideas Worth Spreading</p>
    </td>
  </tr>

  <!-- Content -->
  <tr>
    <td style="padding:40px; font-family:Arial; color:#444;">
      
      <h2>Thank You</h2>

      <p>Dear \${name},</p>

      <p>
        Thank you for attending TEDxNERIST.
      </p>

      <p>
        Your presence contributed to making the event meaningful and inspiring.
        We hope you gained valuable insights and ideas worth spreading.
      </p>

      <p>
        We would appreciate your feedback to help us improve future events.
      </p>

      <!-- CTA -->
      <div style="text-align:center; margin-top:30px;">
        <a href="\${platformUrl}" style="background:#EB0028; color:#fff; padding:12px 25px; text-decoration:none;">
          Share Feedback
        </a>
      </div>

    </td>
  </tr>

  <!-- Closing -->
  <tr>
    <td style="padding:0 40px 40px; font-family:Arial;">
      Warm regards,<br>
      <strong>Team TEDxNERIST</strong><br>
      <span style="font-size:12px; color:#777;">
        North Eastern Regional Institute of Science and Technology (NERIST)
      </span>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td align="center" style="background:#1a1a1a; padding:30px; color:#aaa; font-size:11px;">
      © 2026 TEDxNERIST. All rights reserved.
    </td>
  </tr>

</table>

</td></tr>
</table>
</body>
</html>
`
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
