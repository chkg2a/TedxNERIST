import { motion } from "framer-motion";

const cardVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.96 },
    visible: (i) => ({
        opacity: 1, y: 0, scale: 1,
        transition: { delay: i * 0.08, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }
    })
};

const DashboardTab = ({ stats, admin }) => {
    const statCards = [
        { key: "total", icon: "fa-users", value: stats?.totalRegistrations || 0, label: "Total Registrations" },
        { key: "verified", icon: "fa-check-circle", value: stats?.verifiedRegistrations || 0, label: "Verified" },
        { key: "pending", icon: "fa-hourglass-half", value: stats?.pendingRegistrations || 0, label: "Pending" },
        { key: "checkedin", icon: "fa-ticket-alt", value: stats?.checkedIn || 0, label: "Checked In" },
        { key: "neristian", icon: "fa-graduation-cap", value: stats?.neristianStudents || 0, label: "NERIST Students" },
        { key: "recent", icon: "fa-clock", value: stats?.recentRegistrations || 0, label: "Last 7 Days" },
    ];

    const verifiedPct = stats?.totalRegistrations
        ? Math.round((stats.verifiedRegistrations / stats.totalRegistrations) * 100)
        : 0;
    const checkinPct = stats?.verifiedRegistrations
        ? Math.round((stats.checkedIn / stats.verifiedRegistrations) * 100)
        : 0;

    return (
        <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="dashboard-content"
        >
            <header className="content-header">
                <div>
                    <h1>Dashboard Overview</h1>
                    <p>Welcome back, {admin?.email?.split("@")[0]} 👋</p>
                </div>
            </header>

            <div className="stats-grid">
                {statCards.map((card, i) => (
                    <motion.div
                        key={card.key}
                        className={`stat-card ${card.key}`}
                        custom={i}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    >
                        <div className="stat-icon">
                            <i className={`fas ${card.icon}`}></i>
                        </div>
                        <div className="stat-info">
                            <h3>{card.value}</h3>
                            <p>{card.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="charts-section">
                <motion.div
                    className="chart-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                >
                    <h3><i className="fas fa-building"></i> By Department</h3>
                    <div className="chart-bars">
                        {stats?.departmentStats?.map((dept, index) => {
                            const pct = stats?.totalRegistrations
                                ? Math.round((dept.count / stats.totalRegistrations) * 100)
                                : 0;
                            return (
                                <div key={dept._id || index} className="bar-item">
                                    <div className="bar-label">{dept._id || "N/A"}</div>
                                    <div className="bar-container">
                                        <motion.div
                                            className="bar-fill"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${pct}%` }}
                                            transition={{ delay: 0.6 + index * 0.1, duration: 0.6, ease: "easeOut" }}
                                        />
                                    </div>
                                    <div className="bar-count">{dept.count}</div>
                                </div>
                            );
                        })}
                        {(!stats?.departmentStats || stats.departmentStats.length === 0) && (
                            <p style={{ color: 'var(--admin-text-muted)', fontSize: 13, textAlign: 'center', padding: 20 }}>
                                No department data yet
                            </p>
                        )}
                    </div>
                </motion.div>

                <motion.div
                    className="chart-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                >
                    <h3><i className="fas fa-calendar-alt"></i> By Year</h3>
                    <div className="year-grid">
                        {stats?.yearStats?.map((yearData, index) => (
                            <motion.div
                                key={yearData._id || index}
                                className="year-item"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7 + index * 0.1 }}
                            >
                                <div className="year-circle">
                                    <span className="year-count">{yearData.count}</span>
                                </div>
                                <span className="year-label">{yearData._id || "N/A"}</span>
                            </motion.div>
                        ))}
                        {(!stats?.yearStats || stats.yearStats.length === 0) && (
                            <p style={{ color: 'var(--admin-text-muted)', fontSize: 13, textAlign: 'center', padding: 20, gridColumn: '1 / -1' }}>
                                No year data yet
                            </p>
                        )}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default DashboardTab;
