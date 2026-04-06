import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Check, Loader, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

const tedxRed = "#eb0028";
const borderDefault = "rgba(255, 255, 255, 0.12)";
const API_URL = import.meta.env.VITE_BACK_URL || "http://localhost:3000";

export default function PaymentSuccessPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState("loading"); // loading, success, polling
    const [ticketDetails, setTicketDetails] = useState(null);

    const ticketRawId = searchParams.get("ticket_raw_id");
    const razorpayPaymentId = searchParams.get("razorpay_payment_id"); // Added by razorpay (sometimes)

    useEffect(() => {
        if (!ticketRawId) {
            navigate("/");
            return;
        }

        const fetchPaymentStatus = async () => {
            try {
                // We'll reach out to a public API endpoint to see if the ticket is completed
                // but we only have ticketRawId. Actually, we can just use the order logic 
                // or just wait for the webhook to complete the payment. We will poll the background.
                const response = await axios.get(`${API_URL}/api/tickets/status/${ticketRawId}`);
                if (response.data.ticket.paymentStatus === "completed") {
                    setTicketDetails(response.data.ticket);
                    setStatus("success");
                } else {
                    // Retry after 2 seconds
                    setTimeout(fetchPaymentStatus, 2000);
                }
            } catch (error) {
                console.error("Error polling ticket status", error);
                // Retry after 2 seconds
                setTimeout(fetchPaymentStatus, 2000);
            }
        };

        fetchPaymentStatus();
    }, [ticketRawId, navigate]);

    const handleGoHome = () => navigate("/");

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            <Navbar />
            <div className="flex items-start sm:items-center justify-center min-h-screen px-3 pt-24 pb-8 sm:px-4 sm:pt-28 sm:pb-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 max-w-lg w-full text-center relative overflow-hidden"
                    style={{ background: "#111111", border: `1px solid ${borderDefault}` }}
                >
                    {status === "loading" || status === "polling" ? (
                        <div className="flex flex-col items-center py-10">
                            <Loader className="animate-spin text-white w-12 h-12 mb-6" style={{ color: tedxRed }} />
                            <h2 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "Cirka, serif" }}>
                                Verifying your payment...
                            </h2>
                            <p className="text-gray-400 text-sm" style={{ fontFamily: "Gilroy-Regular, sans-serif" }}>
                                Please do not close or refresh this page.
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Success glow */}
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{ background: "radial-gradient(circle at 50% 0%, rgba(34, 197, 94, 0.1) 0%, transparent 60%)" }}
                            />

                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 relative z-10"
                                style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}
                            >
                                <Check className="text-white w-8 h-8 sm:w-10 sm:h-10" />
                            </motion.div>

                            <motion.h2
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 relative z-10"
                                style={{ fontFamily: "Cirka, serif" }}
                            >
                                Ticket Confirmed! 🎉
                            </motion.h2>

                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-gray-300 text-sm sm:text-base mb-4 relative z-10"
                                style={{ fontFamily: "Gilroy-Regular, sans-serif" }}
                            >
                                Your ticket for TEDxNERIST has been successfully booked!
                            </motion.p>

                            {ticketDetails?.ticketId && (
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="rounded-xl p-4 mb-6 relative z-10"
                                    style={{
                                        background: "rgba(235, 0, 40, 0.08)",
                                        border: `1px solid rgba(235, 0, 40, 0.2)`,
                                    }}
                                >
                                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1" style={{ fontFamily: "Gilroy-Medium, sans-serif" }}>
                                        Your Ticket ID
                                    </p>
                                    <p className="text-xl sm:text-2xl font-bold tracking-wider" style={{ color: tedxRed, fontFamily: "OverpassMono, monospace" }}>
                                        {ticketDetails.ticketId}
                                    </p>
                                </motion.div>
                            )}

                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="text-gray-500 text-xs sm:text-sm mb-6 sm:mb-8 relative z-10"
                                style={{ fontFamily: "Gilroy-Regular, sans-serif" }}
                            >
                                A confirmation email with your ticket details has been sent to <span style={{ color: tedxRed }}>{ticketDetails?.email}</span>
                            </motion.p>

                            <motion.button
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleGoHome}
                                className="px-6 py-2.5 sm:px-8 sm:py-3 rounded-full font-medium transition-all text-white text-sm sm:text-base relative z-10"
                                style={{
                                    backgroundColor: tedxRed,
                                    fontFamily: "Gilroy-Medium, sans-serif",
                                }}
                            >
                                Back to Home
                            </motion.button>
                        </>
                    )}
                </motion.div>
            </div>
            <Footer />
        </div>
    );
}
