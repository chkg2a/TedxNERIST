import { motion, AnimatePresence } from "framer-motion";

const CheckInTab = ({ ticketId, setTicketId, handleCheckIn, checkInResult, isLoading, stats }) => {
    const attendancePct = stats?.verifiedRegistrations
        ? Math.round((stats.checkedIn / stats.verifiedRegistrations) * 100)
        : 0;

    return (
        <motion.div
            key="checkin"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="checkin-content"
        >
            <header className="content-header">
                <h1>Event Check-In</h1>
                <p>Enter the 4-digit numeric code to check in attendees</p>
            </header>

            <motion.div
                className="checkin-card"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
            >
                <div className="checkin-icon">
                    <i className="fas fa-qrcode"></i>
                </div>

                <form onSubmit={handleCheckIn} className="checkin-form">
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Enter 4-Digit Ticket Code (e.g., 1024)"
                            value={ticketId}
                            onChange={(e) => setTicketId(e.target.value.toUpperCase())}
                            required
                        />
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? <span className="spinner"></span> : <><i className="fas fa-check"></i> Check In</>}
                        </button>
                    </div>
                </form>

                <AnimatePresence>
                    {checkInResult && (
                        <motion.div
                            className={`checkin-result ${checkInResult.success ? "success" : "error"}`}
                            initial={{ opacity: 0, y: 16, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -12, scale: 0.97 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="result-icon">
                                <i className={`fas ${checkInResult.success ? "fa-check-circle" : "fa-times-circle"}`}></i>
                            </div>
                            <div className="result-content">
                                {checkInResult.success ? (
                                    <>
                                        <h3>Check-In Successful!</h3>
                                        <p><strong>Name:</strong> {checkInResult.registration?.name}</p>
                                        <p><strong>Email:</strong> {checkInResult.registration?.email}</p>
                                        <p><strong>Ticket:</strong> {checkInResult.registration?.ticketId}</p>
                                    </>
                                ) : (
                                    <>
                                        <h3>Check-In Failed</h3>
                                        <p>{checkInResult.message}</p>
                                        {checkInResult.checkedInAt && (
                                            <p><strong>Already checked in at:</strong> {new Date(checkInResult.checkedInAt).toLocaleString()}</p>
                                        )}
                                    </>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <motion.div
                className="checkin-stats"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.35 }}
            >
                <div className="quickstat">
                    <i className="fas fa-check-double"></i>
                    <div><h4>{stats?.checkedIn || 0}</h4><p>Checked In</p></div>
                </div>
                <div className="quickstat">
                    <i className="fas fa-users"></i>
                    <div><h4>{stats?.verifiedRegistrations || 0}</h4><p>Total Expected</p></div>
                </div>
                <div className="quickstat">
                    <i className="fas fa-percentage"></i>
                    <div><h4>{attendancePct}%</h4><p>Attendance</p></div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default CheckInTab;
