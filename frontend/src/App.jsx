import { useEffect, useRef, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";

// --- 1. CRITICAL: Eager Imports (Above the Fold) ---
// We import these DIRECTLY from the file (not from ./components/index)
// to prevent the bundler from accidentally including the heavy stuff.
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import HeroPhone from "./components/HeroPhone.jsx";
import NotFoundPage from "./components/404.jsx"; // derived from your index listing

// --- 2. Lazy Load Pages (Routes) ---
// These are only downloaded when the route is visited.
const ContactUs = lazy(() => import("./components/ContactUs.jsx"));
const FeedbackForm = lazy(() => import("./components/Feedback.jsx"));
const PrivacyPolicy = lazy(() => import("./components/PPolicy.jsx"));
const NoRefundPolicy = lazy(() => import("./components/RefundPolicy.jsx"));
const TermsAndConditions = lazy(() => import("./components/TermsAndConditions.jsx"));
const RegisterPage = lazy(() => import("./components/RegisterPage.jsx"));

// --- 3. Lazy Load Heavy Home Sections ---
// These are downloaded only when scrolled into view.
const Hero = lazy(() => import("./components/Hero.jsx"));
const VideoSection = lazy(() => import("./components/VideoSection.jsx"));
const Theme = lazy(() => import("./components/Theme.jsx"));
const TicketSection = lazy(() => import("./components/TicketSection.jsx"));
const About = lazy(() => import("./components/About.jsx"));
const Test = lazy(() => import("./components/TestSpeaker.jsx"));
const ReasonsToAttend = lazy(() => import("./components/ReasonsToAttend.jsx"));
const ThreeDViewer = lazy(() => import("./components/ThreeDViewer"));

const isPhone = window.innerWidth >= 800;

// Simple loading spinner
const LoadingFallback = () => (
  <div className="flex items-center justify-center w-full py-20">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
  </div>
);

function TrackPageViews() {
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
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
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
          <Route path="*" element={<NotFoundPage />} />

          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/policy" element={<PrivacyPolicy />} />
          <Route path="/refund" element={<NoRefundPolicy />} />
          <Route path="/term" element={<TermsAndConditions />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/"
            element={
              <div id="Home">
                <Navbar />
                <Hero />
              </div>
            }
          />

          <Route
            path="/testhome"
            element={
              <div id="Home">
                {/* Hero Logic */}
                {false ? (
                  <Suspense fallback={<LoadingFallback />}>
                    <Hero />
                  </Suspense>
                ) : (
                  <>
                    <Navbar /> <HeroPhone />
                  </>
                )}

                <div className="page-container">
                  <SectionWrapper className="trailer-section">
                    <VideoSection
                      videoUrl="https://storage.googleapis.com/maiu/trailer_final.mp4"
                      thumbnail="/images/thumbnail1.jpg"
                    />
                  </SectionWrapper>

                  <SectionWrapper className="theme-section">
                    <Theme />
                  </SectionWrapper>

                  <SectionWrapper className="ticket-sections">
                    <TicketSection />
                  </SectionWrapper>

                  <SectionWrapper className="about-section" id="about">
                    <About id="about" />
                  </SectionWrapper>
                </div>

                <SectionWrapper className="speaker-section mt-32">
                  <Test id="speaker" />
                </SectionWrapper>

                <SectionWrapper className="reasons-section">
                  <ReasonsToAttend />
                </SectionWrapper>

                {/* Footer doesn't need Lazy Loading, just the animation wrapper */}
                <SectionWrapper className="">
                  <div id="contact footer">
                    <Footer />
                  </div>
                </SectionWrapper>
              </div>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
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
      Lighthouse Apus
    </motion.h2>
    <motion.p
      className="text-lg mt-2 italic"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5 }}
    >
      "The Indomitable Spirit"
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
