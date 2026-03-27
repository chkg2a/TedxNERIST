import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   THEME — Full editorial spread
   Asymmetric: giant rotated METAMORPHOSIS watermark left,
   stagger-animated headline center, right-aligned quote body.
   Year badge OverpassMono, opening crimson quote mark.
═══════════════════════════════════════════════════════════════ */

const COLORS = {
  bg: "#0a0a0a",
  red: "#eb0028",
  white: "#f0f0f0",
  grey: "#666",
  greyDim: "#222",
};

const THEME_TEXT = `Metamorphosis captures the profound journey of transformation — the courageous act of shedding what was, to become what must be. Like the winged form emerging from its chrysalis, it celebrates the beauty that arises from change and the strength found in reinvention.`;

const THEME_TEXT_2 = `Rooted in the spirit of growth and renewal, this theme invites us to embrace the unknown, challenge our limits, and emerge as something greater — individually, collectively, and as a society that dares to evolve.`;

/* Individual letter stagger animation */
const LetterReveal = ({ text, delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <span ref={ref} className="inline-block overflow-hidden leading-none" aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "110%", opacity: 0 }}
          animate={inView ? { y: "0%", opacity: 1 } : {}}
          transition={{
            duration: 0.55,
            delay: delay + i * 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

const Theme = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden py-28 md:py-36 px-6 sm:px-10 md:px-16"
      style={{ background: COLORS.bg }}
    >
      {/* ── Watermark: vertical "METAMORPHOSIS" text ── */}
      <div
        className="pointer-events-none select-none absolute left-[-2rem] top-1/2 -translate-y-1/2 z-0 hidden lg:block"
        style={{
          fontFamily: "Cirka, serif",
          fontSize: "clamp(4rem, 8vw, 9rem)",
          fontWeight: 700,
          color: COLORS.red,
          opacity: 0.04,
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          transform: "translateY(-50%) rotate(180deg)",
          letterSpacing: "0.08em",
          lineHeight: 1,
        }}
      >
        METAMORPHOSIS
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0 }}
          className="flex items-center gap-4 mb-14"
        >
          <span
            className="text-[10px] tracking-[0.4em] uppercase"
            style={{ fontFamily: "OverpassMono, monospace", color: COLORS.red }}
          >
            01
          </span>
          <div className="w-8 h-px" style={{ background: COLORS.red }} />
          <span
            className="text-[10px] tracking-[0.3em] uppercase"
            style={{ fontFamily: "OverpassMono, monospace", color: COLORS.grey }}
          >
            Theme
          </span>
          {/* Year badge — right */}
          <div className="ml-auto flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: COLORS.red }} />
            <span
              style={{
                fontFamily: "OverpassMono, monospace",
                fontSize: "11px",
                letterSpacing: "0.25em",
                color: "#333",
              }}
            >
              2026
            </span>
          </div>
        </motion.div>

        {/* Main editorial layout — lg: two column, sm: stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left — Animated headline */}
          <div className="lg:col-span-6 lg:col-start-2">
            <h2
              className="text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] font-bold leading-[0.9] tracking-tight mb-12"
              style={{ fontFamily: "Cirka, serif", overflow: "hidden" }}
            >
              <div>
                <LetterReveal text="Meta" delay={0.1} />
                <LetterReveal
                  text="morphosis"
                  delay={0.1}
                />
              </div>
              {/* Subtitle below the word */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="flex items-center gap-4 mt-5"
              >
                <div className="w-12 h-[1.5px]" style={{ background: COLORS.red }} />
                <span
                  className="text-[11px] tracking-[0.4em] uppercase"
                  style={{
                    fontFamily: "OverpassMono, monospace",
                    color: COLORS.grey,
                    fontSize: "11px",
                  }}
                >
                  Transform · Evolve · Emerge
                </span>
              </motion.div>
            </h2>

            {/* Theme logo — smaller, used as editorial accent */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative inline-block"
            >
              <div
                className="absolute inset-[-30%] rounded-full pointer-events-none"
                style={{
                  background: `radial-gradient(circle, rgba(235,0,40,0.1) 0%, transparent 60%)`,
                  filter: "blur(40px)",
                }}
              />
              <img
                src="/logo.png"
                alt="Metamorphosis"
                className="relative w-28 sm:w-32 md:w-40 h-auto"
                style={{ mixBlendMode: "screen" }}
              />
            </motion.div>
          </div>

          {/* Right — Quote body */}
          <div className="lg:col-span-4 lg:pt-4">
            {/* Opening quote mark */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                fontFamily: "Cirka, serif",
                fontSize: "6rem",
                lineHeight: 0.6,
                color: COLORS.red,
                marginBottom: "1rem",
                display: "block",
              }}
              aria-hidden
            >
              "
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-base md:text-lg leading-[1.9] mb-6"
              style={{ fontFamily: "Gilroy-Regular, sans-serif", color: "#b0b0b0" }}
            >
              <em style={{ fontFamily: "Cirka, serif", color: COLORS.white }}>Metamorphosis</em>{" "}
              {THEME_TEXT.replace("Metamorphosis captures ", "captures ")}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="text-sm leading-[1.9]"
              style={{ fontFamily: "Gilroy-Regular, sans-serif", color: COLORS.grey }}
            >
              {THEME_TEXT_2}
            </motion.p>

            {/* Tagline pill */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="mt-10 inline-flex items-center gap-3"
            >
              <div className="w-6 h-[1px]" style={{ background: COLORS.red }} />
              <span
                className="text-[10px] tracking-[0.35em] uppercase"
                style={{ fontFamily: "OverpassMono, monospace", color: "#333" }}
              >
                TEDxNERIST · March 2026
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Theme;
