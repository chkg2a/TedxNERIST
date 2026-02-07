import { motion } from "framer-motion";

const RegistrationsTab = ({
    registrations, pagination, searchQuery, setSearchQuery, handleSearch,
    filters, setFilters, handleFilter, handleExport, handlePageChange,
    setSelectedRegistration, setDeleteConfirm
}) => {
    return (
        <motion.div
            key="registrations"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="registrations-content"
        >
            <header className="content-header">
                <h1>Registrations</h1>
                <button className="export-btn" onClick={handleExport}>
                    <i className="fas fa-download"></i> Export CSV
                </button>
            </header>

            <div className="search-filter-bar">
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Search by name, email, phone, roll no..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit"><i className="fas fa-search"></i></button>
                </form>

                <div className="filters">
                    <select value={filters.verified} onChange={(e) => setFilters({ ...filters, verified: e.target.value })}>
                        <option value="">All Status</option>
                        <option value="true">Verified</option>
                        <option value="false">Pending</option>
                    </select>

                    <select value={filters.department} onChange={(e) => setFilters({ ...filters, department: e.target.value })}>
                        <option value="">All Departments</option>
                        <option value="CSE">CSE</option>
                        <option value="ECE">ECE</option>
                        <option value="EE">EE</option>
                        <option value="ME">ME</option>
                        <option value="CE">CE</option>
                        <option value="AGE">AGE</option>
                        <option value="FT">FT</option>
                    </select>

                    <select value={filters.year} onChange={(e) => setFilters({ ...filters, year: e.target.value })}>
                        <option value="">All Years</option>
                        <option value="1st">1st Year</option>
                        <option value="2nd">2nd Year</option>
                        <option value="3rd">3rd Year</option>
                        <option value="4th">4th Year</option>
                    </select>

                    <button className="filter-btn" onClick={handleFilter}>
                        <i className="fas fa-filter"></i> Apply
                    </button>
                </div>
            </div>

            <div className="table-container">
                <table className="registrations-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>WhatsApp</th>
                            <th>Department</th>
                            <th>Year</th>
                            <th>Status</th>
                            <th>Ticket ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registrations.map((reg) => (
                            <tr key={reg._id}>
                                <td>
                                    <div className="user-cell">
                                        <span className="user-avatar">{reg.name?.charAt(0)?.toUpperCase()}</span>
                                        {reg.name}
                                    </div>
                                </td>
                                <td>{reg.email}</td>
                                <td>{reg.whatsappNumber}</td>
                                <td>{reg.department || "-"}</td>
                                <td>{reg.year || "-"}</td>
                                <td>
                                    <span className={`status-badge ${reg.isVerified ? "verified" : "pending"}`}>
                                        {reg.isVerified ? "Verified" : "Pending"}
                                    </span>
                                </td>
                                <td><code className="ticket-code">{reg.ticketId || "-"}</code></td>
                                <td>
                                    <div className="action-btns">
                                        <button className="action-btn view" onClick={() => setSelectedRegistration(reg)} title="View Details">
                                            <i className="fas fa-eye"></i>
                                        </button>
                                        <button className="action-btn delete" onClick={() => setDeleteConfirm(reg)} title="Delete">
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {registrations.length === 0 && (
                    <div className="empty-state"><i className="fas fa-inbox"></i><p>No registrations found</p></div>
                )}
            </div>

            {pagination && pagination.totalPages > 1 && (
                <div className="pagination">
                    <button disabled={pagination.currentPage === 1} onClick={() => handlePageChange(pagination.currentPage - 1)}>
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <span>Page {pagination.currentPage} of {pagination.totalPages}</span>
                    <button disabled={!pagination.hasMore} onClick={() => handlePageChange(pagination.currentPage + 1)}>
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
            )}
        </motion.div>
    );
};

export default RegistrationsTab;
