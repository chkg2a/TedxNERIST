import React from "react";
import { motion } from "framer-motion";
import { reasons } from "../constants/Reasons";

/* ═══════════════════════════════════════════════════════════════
   REASONS TO ATTEND — Editorial bento-grid tiles
   Pure typography — no circular images. Numbered monospace labels,
   bold Gilroy titles, crimson accent bar expands on hover.
═══════════════════════════════════════════════════════════════ */

const COLORS = {
  bg: "#050505",
  bgAlt: "#0a0a0a",
  red: "#eb0028",
  white: "#f0f0f0",
  grey: "#666",
  greyFaint: "#111",
};

/* Column spans for alternating layout — creates editorial bento feel */
const BENTO_SPANS = [
  "md:col-span-2", // 01 — wide
  "md:col-span-1", // 02
  "md:col-span-1", // 03
  "md:col-span-1", // 04
  "md:col-span-2", // 05 — wide
  "md:col-span-1", // 06 (will overflow to next row nicely)
];

/**
 * Individual reason tile — typographic bento card
 */
function ReasonTile({ reason, index, span }) {
  return (
    <motion.div
      className={`relative group p-7 md:p-9 flex flex-col justify-between overflow-hidden ${span}`}
      style={{
        background: index % 2 === 0 ? COLORS.bg : COLORS.bgAlt,
        border: `1px solid #141414`,
        minHeight: "220px",
      }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Crimson accent bar — top, expands on hover */}
      <div
        className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
        style={{ background: COLORS.red }}
      />

      {/* Subtle radial glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 0% 0%, rgba(235,0,40,0.04) 0%, transparent 70%)`,
        }}
      />

      {/* Number */}
      <span
        className="text-[10px] tracking-[0.35em] block mb-6 z-10"
        style={{ fontFamily: "OverpassMono, monospace", color: COLORS.red }}
      >
        {reason.id}
      </span>

      {/* Title */}
      <div className="z-10">
        <h3
          className="text-xl md:text-2xl font-bold leading-tight mb-3 transition-colors duration-300 group-hover:text-white"
          style={{ fontFamily: "Gilroy, sans-serif", color: "#d0d0d0" }}
        >
          {reason.title.charAt(0).toUpperCase() + reason.title.slice(1)}
        </h3>
        <p
          className="text-sm leading-[1.8] transition-colors duration-300"
          style={{ fontFamily: "Gilroy-Regular, sans-serif", color: COLORS.grey }}
        >
          {reason.description}
        </p>
      </div>

      {/* Bottom arrow — visible on hover */}
      <div
        className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-x-2 group-hover:translate-x-0"
        style={{ color: COLORS.red, fontFamily: "OverpassMono, monospace", fontSize: "16px" }}
      >
        →
      </div>
    </motion.div>
  );
}

const ReasonsToAttend = () => {
  return (
    <div
      className="relative py-24 md:py-32 px-6 sm:px-10 md:px-16"
      style={{ background: COLORS.bg }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-16"
        >
          <span
            className="text-[10px] tracking-[0.4em] uppercase block mb-5"
            style={{ fontFamily: "OverpassMono, monospace", color: COLORS.red }}
          >
            05 — Why Attend
          </span>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2
              className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[0.92]"
              style={{ fontFamily: "Cirka, serif", color: COLORS.white }}
            >
              Reasons<br />
              to <span style={{ color: COLORS.red }}>Attend</span>
            </h2>
            <p
              className="max-w-xs text-sm leading-relaxed self-end"
              style={{ fontFamily: "Gilroy-Regular, sans-serif", color: COLORS.grey }}
            >
              Three days of ideas, performances, and connections that will stay with you long after the curtain falls.
            </p>
          </div>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px]" style={{ background: "#141414" }}>
          {reasons.map((reason, index) => (
            <ReasonTile
              key={reason.id}
              reason={reason}
              index={index}
              span={BENTO_SPANS[index] ?? "md:col-span-1"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReasonsToAttend;
