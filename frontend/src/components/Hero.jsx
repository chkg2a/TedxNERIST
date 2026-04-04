import { useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ParticleCanvas from "./ParticleCanvas";
import SpeakerReveal from "./SpeakerReveal";

/* ═══════════════════════════════════════════════════════════════════
   DESIGN SYSTEM
   Cinematic editorial noir — film-poster typography, dramatic
   negative space, red as punctuation (never decoration).
   Fonts: Cirka (display), OverpassMono (labels), Gilroy-Regular (body)
═══════════════════════════════════════════════════════════════════ */

const COLORS = {
  bg: "#050505",
  bgAlt: "#0a0a0a",
  red: "#eb0028",
  redDark: "#c20022",
  white: "#f0f0f0",
  grey: "#d1d5db",
  greyDim: "#9ca3af",
  greyFaint: "#4b5563",
};

/* ─── Noise SVG for filmic grain overlay ─── */
const GrainOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-40 opacity-[0.035]" style={{ mixBlendMode: "overlay" }}>
    <svg width="100%" height="100%">
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  </div>
);

/* ─── Scroll-triggered reveal ─── */
const Reveal = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─── Section label — editorial numbered marker ─── */
const SectionLabel = ({ number, text }) => (
  <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-14">
    <span
      className="text-[10px] tracking-[0.4em] uppercase"
      style={{ fontFamily: "OverpassMono, monospace", color: COLORS.red }}
    >
      {number}
    </span>
    <div className="w-8 h-px" style={{ background: COLORS.red }} />
    <span
      className="text-[10px] tracking-[0.3em] uppercase"
      style={{ fontFamily: "OverpassMono, monospace", color: COLORS.grey }}
    >
      {text}
    </span>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════ */

function Hero({ isReady }) {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="relative text-white font-sans">
      <Navbar isReady={isReady} />
      <GrainOverlay />

      {/* ═══════════════════════════════════════════════════════
          HERO — Cinematic full-screen
      ═══════════════════════════════════════════════════════ */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity }}
        className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden"
      >
        <ParticleCanvas isReady={isReady} />
        {/* Ambient red pulse — very subtle */}
        <div
          className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(235,0,40,0.05) 0%, transparent 65%)" }}
        />

        {/* ── Content stack ── */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto w-full">

          {/* ── Animated Wordmark: x rises, TED ← and NERIST → ── */}
          <div
            className="flex items-center justify-center w-full mb-4"
            style={{ overflow: "hidden", maxWidth: "100%" }}
          >
            {/* TED — slides in from left */}
            <motion.span
              initial={{ opacity: 0, x: -80 }}
              animate={isReady ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
              transition={{ duration: 0.65, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-bold leading-none tracking-tight text-white select-none"
              style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: "clamp(2rem, 8vw, 5.5rem)", fontWeight: 900 }}
            >
              TED
            </motion.span>

            {/* x — rises from below FIRST */}
            <motion.span
              initial={{ opacity: 0, y: 70 }}
              animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 70 }}
              transition={{ duration: 0.55, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
              className="font-bold leading-none select-none"
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2rem, 5.5vw, 5rem)",
                color: "#eb0028",
                margin: "0 0.03em",
                alignSelf: "flex-end",
                paddingBottom: "0.12em",
              }}
            >
              x
            </motion.span>

            {/* NERIST — slides in from right */}
            <motion.span
              initial={{ opacity: 0, x: 80 }}
              animate={isReady ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
              transition={{ duration: 0.65, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-bold leading-none tracking-tight select-none"
              style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: "clamp(2rem, 8vw, 5.5rem)", color: "#eb0028", fontWeight: 900 }}
            >
              NERIST
            </motion.span>
          </div>

          {/* Horizontal rule accent */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isReady ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.7, delay: 4.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-12 sm:w-16 h-[1px] mb-5 sm:mb-8 origin-center"
            style={{ background: COLORS.red }}
          />

          {/* Theme title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 4.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-[2rem] sm:text-[2.8rem] md:text-[3.8rem] lg:text-[4.5rem] font-bold leading-[0.95] tracking-tight"
            style={{ fontFamily: "Cirka, serif" }}
          >
            METAMORPHOSIS
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.6, delay: 4.4 }}
            className="mt-5 text-[11px] sm:text-xs tracking-[0.4em] uppercase"
            style={{ fontFamily: "OverpassMono, monospace", color: COLORS.grey }}
          >
            Transform · Transcend · Triumph
          </motion.p>

          {/* Event meta */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isReady ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 4.6 }}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 text-[10px] sm:text-[11px] tracking-[0.2em] uppercase"
            style={{ fontFamily: "OverpassMono, monospace", color: COLORS.greyDim }}
          >
            <span>11 April 2026</span>
            <span className="hidden sm:inline" style={{ color: COLORS.red }}>—</span>
            <span>Silver Jubilee Hall</span>
            <span className="hidden sm:inline" style={{ color: COLORS.red }}>—</span>
            <span>NERIST, Arunachal Pradesh</span>
          </motion.div>

          {/* CTA */}
          <motion.button
            initial={{ opacity: 0, y: 14 }}
            animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.6, delay: 4.8 }}
            whileHover={{ scale: 1.03, boxShadow: `0 0 60px ${COLORS.red}30` }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/register")}
            className="mt-8 sm:mt-12 group relative overflow-hidden rounded-full text-white font-semibold text-sm sm:text-base inline-flex items-center gap-2 sm:gap-2.5 cursor-pointer transition-all duration-300"
            style={{ fontFamily: "Gilroy-Medium, sans-serif", padding: "clamp(12px, 2vw, 16px) clamp(28px, 5vw, 40px)", background: COLORS.red }}
          >
            <span className="relative z-10">Register Now</span>
            <ArrowRight size={16} strokeWidth={2.5} className="relative z-10 group-hover:translate-x-0.5 transition-transform" />
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
          </motion.button>
        </div>


        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1.2 }}
          className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10"
        >
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown size={14} style={{ color: COLORS.greyDim }} />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════
          THEME
      ═══════════════════════════════════════════════════════ */}
      <section className="relative px-4 sm:px-10 md:px-16 py-20 sm:py-32 md:py-40 bg-[#050505]">
        {/* Top accent line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20" style={{ background: `linear-gradient(to bottom, transparent, ${COLORS.red}40, transparent)` }} />

        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SectionLabel number="01" text="Theme" />
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-20 items-center">
            {/* Left — Title + description (takes more space) */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <Reveal delay={0.1}>
                <h2
                  className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] mb-5 sm:mb-8"
                  style={{ fontFamily: "Cirka, serif" }}
                >
                  Meta<span style={{ color: COLORS.red }}>morphosis</span>
                </h2>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-base md:text-lg leading-[1.9] mb-5" style={{ fontFamily: "Gilroy-Regular, sans-serif", color: "#b0b0b0" }}>
                  <span className="italic" style={{ fontFamily: "Cirka, serif", color: COLORS.white }}>Metamorphosis</span> captures
                  the profound journey of transformation — the courageous act of shedding what was, to become
                  what must be. Like the winged form emerging from its chrysalis, it celebrates the beauty that
                  arises from change and the strength found in reinvention.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <p className="text-sm md:text-base leading-[1.9]" style={{ fontFamily: "Gilroy-Regular, sans-serif", color: COLORS.grey }}>
                  Rooted in the spirit of growth and renewal, this theme invites us to embrace the unknown,
                  challenge our limits, and emerge as something greater — individually, collectively, and as a society
                  that dares to evolve.
                </p>
              </Reveal>
            </div>

            {/* Right — Logo with dramatic glow */}
            <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
              <Reveal delay={0.15}>
                <div className="relative">
                  <div
                    className="absolute inset-[-40%] rounded-full pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${COLORS.red}12 0%, transparent 65%)`, filter: "blur(60px)" }}
                  />
                  <img
                    src="/logo.png"
                    alt="Metamorphosis"
                    className="relative w-40 sm:w-48 md:w-56 lg:w-64 h-auto"
                    style={{ mixBlendMode: "screen" }}
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ABOUT
      ═══════════════════════════════════════════════════════ */}
      <section className="relative px-4 sm:px-10 md:px-16 py-20 sm:py-32 md:py-40 bg-[#050505]">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SectionLabel number="02" text="About" />
          </Reveal>

          <Reveal delay={0.1}>
            <h2
              className="text-2xl sm:text-4xl md:text-5xl font-bold leading-[1.1] mb-10 sm:mb-16 max-w-2xl"
              style={{ fontFamily: "Cirka, serif" }}
            >
              What is{" "}
              <span style={{ color: COLORS.red }}>TEDx</span>NERIST<span style={{ color: COLORS.red }}>?</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0">
            {[
              {
                num: "I",
                title: "TEDxNERIST",
                text: "An independently organized TEDx event held at NERIST, Arunachal Pradesh, celebrating local voices and global ideas through inspiring talks and performances.",
              },
              {
                num: "II",
                title: "TED",
                text: "Technology, Entertainment, and Design — a global platform for creativity and innovation featuring diverse voices from business leaders, scientists, and philosophers.",
              },
              {
                num: "III",
                title: "TEDx",
                text: "Independently organized events worldwide promoting 'ideas worth spreading', hosting over 3,000 events annually and making a global impact at the grassroots level.",
              },
            ].map((card, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div
                  className={`p-5 sm:p-7 md:p-8 h-full group transition-colors duration-500 hover:bg-white/[0.02] border-t ${i > 0 ? 'md:border-l' : ''}`}
                  style={{ borderColor: COLORS.greyFaint }}
                >
                  {/* Roman numeral */}
                  <span
                    className="text-[10px] tracking-[0.3em] block mb-4 sm:mb-6"
                    style={{ fontFamily: "OverpassMono, monospace", color: COLORS.red }}
                  >
                    {card.num}
                  </span>

                  <h3
                    className="text-lg md:text-xl font-bold mb-3 sm:mb-4 transition-colors duration-300 group-hover:text-[#eb0028]"
                    style={{ fontFamily: "Gilroy, sans-serif" }}
                  >
                    {card.title}
                  </h3>

                  <p
                    className="text-sm leading-[1.8]"
                    style={{ fontFamily: "Gilroy-Regular, sans-serif", color: COLORS.grey }}
                  >
                    {card.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          EXPERIENCE
      ═══════════════════════════════════════════════════════ */}
      <section className="relative px-4 sm:px-10 md:px-16 py-20 sm:py-32 md:py-40 bg-[#050505]">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SectionLabel number="03" text="Experience" />
          </Reveal>

          <Reveal delay={0.1}>
            <h2
              className="text-2xl sm:text-4xl md:text-5xl font-bold leading-[1.1] mb-10 sm:mb-16 max-w-2xl"
              style={{ fontFamily: "Cirka, serif" }}
            >
              What to <span style={{ color: COLORS.red }}>expect</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-10 sm:gap-y-14">
            {[
              {
                num: "01",
                title: "Inspiring Talks",
                text: "Hear from thought leaders, innovators, and change-makers sharing transformative ideas from diverse fields.",
              },
              {
                num: "02",
                title: "Live Performances",
                text: "Experience captivating artistic performances that bring ideas to life through music, dance, and creative expression.",
              },
              {
                num: "03",
                title: "Networking",
                text: "Connect with like-minded individuals, fellow students, and professionals in an environment that fosters collaboration.",
              },
              {
                num: "04",
                title: "3-Day Experience",
                text: "A multi-day cultural and intellectual experience that will leave you inspired, motivated, and ready to take action.",
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="group">
                  {/* Number + line */}
                  <div className="flex items-center gap-4 mb-5">
                    <span
                      className="text-[10px] tracking-[0.3em]"
                      style={{ fontFamily: "OverpassMono, monospace", color: COLORS.red }}
                    >
                      {item.num}
                    </span>
                    <div className="flex-1 h-px transition-all duration-500 group-hover:w-full" style={{ background: COLORS.greyFaint }} />
                  </div>

                  <h3
                    className="text-base sm:text-lg font-bold mb-3 transition-colors duration-300 group-hover:text-[#eb0028]"
                    style={{ fontFamily: "Gilroy, sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-[1.8]"
                    style={{ fontFamily: "Gilroy-Regular, sans-serif", color: COLORS.grey }}
                  >
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SPEAKER REVEAL
      ═══════════════════════════════════════════════════════ */}
      <SpeakerReveal />

      {/* ═══════════════════════════════════════════════════════
          CTA — Cinematic closer
      ═══════════════════════════════════════════════════════ */}
      <section className="relative px-4 sm:px-10 md:px-16 py-20 sm:py-32 md:py-40 bg-[#050505] overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] sm:w-[600px] sm:h-[300px] pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${COLORS.red}08 0%, transparent 60%)` }}
        />

        <Reveal>
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <div className="w-10 h-[1px] mx-auto mb-10" style={{ background: COLORS.red }} />

            <h2
              className="text-2xl sm:text-4xl md:text-5xl font-bold leading-[1.1] mb-4 sm:mb-6"
              style={{ fontFamily: "Cirka, serif" }}
            >
              Embrace the{" "}
              <span style={{ color: COLORS.red }}>change</span>
            </h2>
            <p
              className="text-sm sm:text-base md:text-lg mb-8 sm:mb-12 max-w-md mx-auto leading-[1.85]"
              style={{ fontFamily: "Gilroy-Regular, sans-serif", color: COLORS.grey }}
            >
              Join us at NERIST for an unforgettable experience of transformation, inspiration, and ideas worth spreading.
            </p>

            <motion.button
              whileHover={{ scale: 1.03, boxShadow: `0 0 60px ${COLORS.red}25` }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/register")}
              className="group relative overflow-hidden rounded-full text-white font-semibold text-sm sm:text-base inline-flex items-center gap-2 sm:gap-2.5 cursor-pointer transition-all duration-300"
              style={{ fontFamily: "Gilroy-Medium, sans-serif", padding: "clamp(12px, 2vw, 16px) clamp(30px, 5vw, 44px)", background: COLORS.red }}
            >
              <span className="relative z-10">Register Now</span>
              <ArrowRight size={16} strokeWidth={2.5} className="relative z-10 group-hover:translate-x-0.5 transition-transform" />
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            </motion.button>

            <p
              className="mt-8 text-[10px] tracking-[0.3em] uppercase"
              style={{ fontFamily: "OverpassMono, monospace", color: COLORS.greyDim }}
            >
              Limited seats available
            </p>
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════ */}
      <Footer />
    </div>
  );
}

export default Hero;
