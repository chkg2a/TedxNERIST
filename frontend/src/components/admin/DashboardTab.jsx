import { motion } from "framer-motion";

const DashboardTab = ({ stats, admin }) => {
    return (
        <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="dashboard-content"
        >
            <header className="content-header">
                <h1>Dashboard Overview</h1>
                <p>Welcome back, {admin?.email?.split("@")[0]}</p>
            </header>

            <div className="stats-grid">
                <motion.div className="stat-card total" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <div className="stat-icon"><i className="fas fa-users"></i></div>
                    <div className="stat-info"><h3>{stats?.totalRegistrations || 0}</h3><p>Total Registrations</p></div>
                </motion.div>

                <motion.div className="stat-card verified" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <div className="stat-icon"><i className="fas fa-check-circle"></i></div>
                    <div className="stat-info"><h3>{stats?.verifiedRegistrations || 0}</h3><p>Verified</p></div>
                </motion.div>

                <motion.div className="stat-card pending" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <div className="stat-icon"><i className="fas fa-hourglass-half"></i></div>
                    <div className="stat-info"><h3>{stats?.pendingRegistrations || 0}</h3><p>Pending</p></div>
                </motion.div>

                <motion.div className="stat-card checkedin" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <div className="stat-icon"><i className="fas fa-ticket-alt"></i></div>
                    <div className="stat-info"><h3>{stats?.checkedIn || 0}</h3><p>Checked In</p></div>
                </motion.div>

                <motion.div className="stat-card neristian" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                    <div className="stat-icon"><i className="fas fa-graduation-cap"></i></div>
                    <div className="stat-info"><h3>{stats?.neristianStudents || 0}</h3><p>NERIST Students</p></div>
                </motion.div>

                <motion.div className="stat-card recent" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                    <div className="stat-icon"><i className="fas fa-clock"></i></div>
                    <div className="stat-info"><h3>{stats?.recentRegistrations || 0}</h3><p>Last 7 Days</p></div>
                </motion.div>
            </div>

            <div className="charts-section">
                <motion.div className="chart-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                    <h3><i className="fas fa-building"></i> By Department</h3>
                    <div className="chart-bars">
                        {stats?.departmentStats?.map((dept, index) => (
                            <div key={dept._id || index} className="bar-item">
                                <div className="bar-label">{dept._id || "N/A"}</div>
                                <div className="bar-container">
                                    <motion.div
                                        className="bar-fill"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(dept.count / (stats?.totalRegistrations || 1)) * 100}%` }}
                                        transition={{ delay: 0.8 + index * 0.1 }}
                                    ></motion.div>
                                </div>
                                <div className="bar-count">{dept.count}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div className="chart-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                    <h3><i className="fas fa-calendar-alt"></i> By Year</h3>
                    <div className="year-grid">
                        {stats?.yearStats?.map((yearData, index) => (
                            <div key={yearData._id || index} className="year-item">
                                <div className="year-circle"><span className="year-count">{yearData.count}</span></div>
                                <span className="year-label">{yearData._id || "N/A"}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default DashboardTab;
