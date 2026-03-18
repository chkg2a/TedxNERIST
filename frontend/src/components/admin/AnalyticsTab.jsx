import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/authStore";

const AnalyticsTab = () => {
    const { timeline, activities, fetchTimeline, fetchActivity } = useAuthStore();
    const [timeRange, setTimeRange] = useState(14);

    useEffect(() => {
        fetchTimeline(timeRange);
        fetchActivity(15);
    }, [timeRange, fetchTimeline, fetchActivity]);

    // Compute max for chart scaling
    const maxCount = useMemo(() => {
        if (!timeline.length) return 1;
        return Math.max(...timeline.map(d => d.total), 1);
    }, [timeline]);

    const totalInRange = useMemo(() => {
        return timeline.reduce((sum, d) => sum + d.total, 0);
    }, [timeline]);

    const verifiedInRange = useMemo(() => {
        return timeline.reduce((sum, d) => sum + d.verified, 0);
    }, [timeline]);

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
    };

    const timeAgo = (dateStr) => {
        const diff = Date.now() - new Date(dateStr).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 1) return "Just now";
        if (mins < 60) return `${mins}m ago`;
        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return `${hrs}h ago`;
        const days = Math.floor(hrs / 24);
        return `${days}d ago`;
    };

    const activityMeta = {
        registered: { icon: "fa-user-plus", color: "#818cf8", label: "Registered" },
        verified: { icon: "fa-check-circle", color: "#10b981", label: "Verified" },
        checked_in: { icon: "fa-ticket-alt", color: "#e62b1e", label: "Checked In" }
    };

    return (
        <motion.div
            key="analytics"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="analytics-content"
        >
            <header className="content-header">
                <div>
                    <h1>Analytics</h1>
                    <p>Registration trends & activity feed</p>
                </div>
                <div className="time-range-pills">
                    {[7, 14, 30].map(d => (
                        <button
                            key={d}
                            className={`range-pill ${timeRange === d ? "active" : ""}`}
                            onClick={() => setTimeRange(d)}
                        >{d}D</button>
                    ))}
                </div>
            </header>

            {/* Summary Cards */}
            <div className="analytics-summary">
                <div className="summary-card">
                    <div className="summary-icon" style={{ background: 'rgba(129, 140, 248, 0.12)', color: '#818cf8' }}>
                        <i className="fas fa-user-plus"></i>
                    </div>
                    <div>
                        <h4>{totalInRange}</h4>
                        <p>Registrations ({timeRange}d)</p>
                    </div>
                </div>
                <div className="summary-card">
                    <div className="summary-icon" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#10b981' }}>
                        <i className="fas fa-check-circle"></i>
                    </div>
                    <div>
                        <h4>{verifiedInRange}</h4>
                        <p>Verified ({timeRange}d)</p>
                    </div>
                </div>
                <div className="summary-card">
                    <div className="summary-icon" style={{ background: 'rgba(230, 43, 30, 0.12)', color: '#e62b1e' }}>
                        <i className="fas fa-chart-line"></i>
                    </div>
                    <div>
                        <h4>{totalInRange > 0 ? (totalInRange / timeRange).toFixed(1) : 0}</h4>
                        <p>Avg / Day</p>
                    </div>
                </div>
            </div>

            {/* Timeline Chart */}
            <motion.div
                className="chart-card timeline-chart"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
            >
                <h3><i className="fas fa-chart-area"></i> Registration Timeline</h3>
                <div className="timeline-bars">
                    {timeline.map((day, i) => {
                        const height = Math.max((day.total / maxCount) * 100, 2);
                        const verifiedHeight = day.total > 0
                            ? Math.max((day.verified / maxCount) * 100, 1)
                            : 0;
                        return (
                            <div key={day.date} className="timeline-bar-group" title={`${formatDate(day.date)}: ${day.total} total, ${day.verified} verified`}>
                                <div className="timeline-bar-wrapper">
                                    <motion.div
                                        className="timeline-bar total"
                                        initial={{ height: 0 }}
                                        animate={{ height: `${height}%` }}
                                        transition={{ delay: 0.2 + i * 0.02, duration: 0.4 }}
                                    />
                                    <motion.div
                                        className="timeline-bar verified"
                                        initial={{ height: 0 }}
                                        animate={{ height: `${verifiedHeight}%` }}
                                        transition={{ delay: 0.3 + i * 0.02, duration: 0.4 }}
                                    />
                                </div>
                                {(i === 0 || i === timeline.length - 1 || i % Math.max(1, Math.floor(timeline.length / 6)) === 0) && (
                                    <span className="timeline-label">{formatDate(day.date)}</span>
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className="chart-legend">
                    <span><i style={{ color: '#e62b1e' }}>■</i> Total</span>
                    <span><i style={{ color: '#10b981' }}>■</i> Verified</span>
                </div>
            </motion.div>

            {/* Activity Feed */}
            <motion.div
                className="chart-card activity-feed"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
            >
                <h3><i className="fas fa-stream"></i> Recent Activity</h3>
                <div className="activity-list">
                    {activities.map((activity, i) => {
                        const meta = activityMeta[activity.type] || activityMeta.registered;
                        return (
                            <motion.div
                                key={activity._id + activity.type}
                                className="activity-item"
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.05 * i }}
                            >
                                <div className="activity-icon" style={{ background: `${meta.color}18`, color: meta.color }}>
                                    <i className={`fas ${meta.icon}`}></i>
                                </div>
                                <div className="activity-info">
                                    <p className="activity-name">
                                        <strong>{activity.name}</strong>
                                        <span className="activity-badge" style={{ color: meta.color }}>{meta.label}</span>
                                    </p>
                                    <p className="activity-detail">
                                        {activity.email}
                                        {activity.department && <span> · {activity.department}</span>}
                                    </p>
                                </div>
                                <span className="activity-time">{timeAgo(activity.time)}</span>
                            </motion.div>
                        );
                    })}
                    {activities.length === 0 && (
                        <p style={{ color: 'var(--admin-text-muted)', textAlign: 'center', padding: 28, fontSize: 13 }}>
                            No recent activity
                        </p>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AnalyticsTab;
