import { useEffect, useRef, lazy, Suspense, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import { Toaster } from "react-hot-toast";

// --- 1. CRITICAL: Eager Imports (Above the Fold) ---
// We import these DIRECTLY from the file (not from ./components/index)
// to prevent the bundler from accidentally including the heavy stuff.
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import HeroPhone from "./components/HeroPhone.jsx";
import NotFoundPage from "./components/404.jsx";
import ButterflySequence from "./components/ButterflySequence.jsx";
import SeoManager from "./components/SeoManager.jsx";

// --- 2. Lazy Load Pages (Routes) ---
// These are only downloaded when the route is visited.
const ContactUs = lazy(() => import("./components/ContactUs.jsx"));
const AboutPage = lazy(() => import("./components/About.jsx"));
const FeedbackForm = lazy(() => import("./components/Feedback.jsx"));
const PrivacyPolicy = lazy(() => import("./components/PPolicy.jsx"));
const NoRefundPolicy = lazy(() => import("./components/RefundPolicy.jsx"));
const TermsAndConditions = lazy(() => import("./components/TermsAndConditions.jsx"));
const RegisterPage = lazy(() => import("./components/RegisterPage.jsx"));
const AdminLogin = lazy(() => import("./components/admin/AdminLogin.jsx"));
const AdminDashboard = lazy(() => import("./components/admin/AdminDashboard.jsx"));
const ProtectedRoute = lazy(() => import("./components/admin/ProtectedRoute.jsx"));
const TeamPage = lazy(() => import("./components/TeamPage.jsx"));
const SpeakersPage = lazy(() => import("./components/SpeakersPage.jsx"));
const BuyTicketPage = lazy(() => import("./components/BuyTicketPage.jsx"));


// --- 3. Lazy Load Heavy Home Sections ---
const Hero = lazy(() => import("./components/Hero.jsx"));
const ThreeDViewer = lazy(() => import("./components/ThreeDViewer"));

const isPhone = window.innerWidth >= 800;

// Simple loading spinner
const LoadingFallback = () => (
  <div className="flex items-center justify-center w-full py-20">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   LOADING SCREEN
   logo_load.png:
     1. Enters blurred (blur 24px → 0) + fades in over 0.8s
     2. Holds sharp for ~0.5s
     3. Exit: blurs back out (0 → 20px) + opacity 1→0 over 0.7s
   Background stays black; app content is already mounted below.
═══════════════════════════════════════════════════════════════ */
const LoadingScreen = ({ onDone }) => {
  useEffect(() => {
    // Total time before we signal "done": enter(800) + hold(600) = 1400ms
    // AnimatePresence will then run the exit animation (700ms)
    const timer = setTimeout(onDone, 1400);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      key="loader"
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "#050505" }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(20px)", scale: 1.04 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.img
        src="/logo_load.png"
        alt="TEDxNERIST"
        style={{ width: "clamp(120px, 20vw, 260px)", height: "auto" }}
        initial={{ opacity: 0, filter: "blur(24px)", scale: 0.96 }}
        animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
        exit={{ opacity: 0, filter: "blur(20px)", scale: 1.04 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
};

const ButterflyWrapper = ({ setIsReady }) => {
  const location = useLocation();
  if (location.pathname !== "/") return null;
  return <ButterflySequence onDone={() => setIsReady(true)} />;
};

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

// Optimized Wrapper: Handles Animation + Lazy Loading on Scroll
function SectionWrapper({ children, className, id }) {
  const ref = useRef(null);
  // Trigger loading slightly before the element hits the screen (threshold 0.1)
  const isInView = useInView(ref, { triggerOnce: true, margin: "0px 0px 200px 0px" });

  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      // min-height ensures the scrollbar doesn't jump wildly while loading
      style={{ minHeight: "100px" }}
    >
      {isInView ? (
        <Suspense fallback={<LoadingFallback />}>
          {children}
        </Suspense>
      ) : null}
    </motion.div>
  );
}

function App() {
  const [loading, setLoading] = useState(window.location.pathname === "/");
  const [isReady, setIsReady] = useState(false);

  return (
    <>
      <Toaster position="top-center" />
      <AnimatePresence>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <BrowserRouter>
        <SeoManager />
        {/* Only mount on home page */}
        <ButterflyWrapper setIsReady={setIsReady} />
        <ScrollToTop />

        {/* Global theme elements */}
        <div className="bg-noise"></div>
        <div className="ambient-glow ambient-glow-1"></div>
        <div className="ambient-glow ambient-glow-2"></div>

        <Suspense fallback={<ComingSoon />}>
          <Routes>
            <Route
              path="/contact"
              element={
                <>
                  <Navbar />
                  <div className="mt-8">
                    <ContactUs />
                  </div>
                  <Footer />
                </>
              }
            />
            <Route
              path="/about"
              element={
                <>
                  <Navbar />
                  <AboutPage />
                  <Footer />
                </>
              }
            />
            <Route
              path="/team"
              element={
                <>
                  <Navbar />
                  <TeamPage />
                  <Footer />
                </>
              }
            />
            <Route
              path="/speakers"
              element={
                <>
                  <Navbar />
                  <SpeakersPage />
                  <Footer />
                </>
              }
            />
            <Route path="*" element={<NotFoundPage />} />

            <Route path="/feedback" element={<FeedbackForm />} />
            <Route path="/policy" element={<PrivacyPolicy />} />
            <Route path="/refund" element={<NoRefundPolicy />} />
            <Route path="/term" element={<TermsAndConditions />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/buy-ticket" element={<BuyTicketPage />} />
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin" element={<AdminLogin />} />


            <Route
              path="/"
              element={
                <div id="Home">
                  <Hero isReady={isReady} />
                </div>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

const ComingSoon = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center">
    <Suspense fallback={<LoadingFallback />}>
      <ThreeDViewer modelPath="/model/logo.glb" />
    </Suspense>
    <motion.img
      src="/logo_wl.webp"
      alt="TEDxNERIST Logo"
      className="w-60 mb-6"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    />
    <motion.h2
      className="text-3xl mt-2"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
    >
      Metamorphosis
    </motion.h2>
    <motion.p
      className="text-lg mt-2 italic"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5 }}
    >
      "Transform · Transcend · Triumph"
    </motion.p>
    <motion.p
      className="text-lg mt-4 font-semibold"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 1 }}
    >
      🎟️ Ticket Booking Coming Soon!
    </motion.p>
  </div>
);

export default App;
