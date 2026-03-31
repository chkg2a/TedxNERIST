import React, { useState } from "react";
import { motion } from "framer-motion";
import speakers from "../constants/Speakers.js";
import SpeakerInfo from "./SpeakerInfo.jsx";

/* ═══════════════════════════════════════════════════════════════
   SPEAKERS — Editorial asymmetric grid
   Film-poster portrait cards with numbered labels + stagger reveal.
   Hover: name slides up, role revealed, crimson accent bar expands.
═══════════════════════════════════════════════════════════════ */

const COLORS = {
  bg: "#0a0a0a",
  red: "#eb0028",
  white: "#f0f0f0",
  grey: "#d1d5db",
  greyDim: "#1a1a1a",
};

/* Grid layout: alternate between large and standard cards */
const SPANS = [
  "md:col-span-2 md:row-span-2",  // 0 — large
  "md:col-span-1 md:row-span-1",  // 1 — standard
  "md:col-span-1 md:row-span-1",  // 2 — standard
  "md:col-span-1 md:row-span-1",  // 3 — standard
  "md:col-span-1 md:row-span-1",  // 4 — standard
];

const SpeakerCard = ({ speaker, index, span, onClick }) => {
  const num = String(index + 1).padStart(2, "0");
  return (
    <motion.div
      className={`relative overflow-hidden cursor-pointer group ${span}`}
      style={{
        aspectRatio: index === 0 ? "auto" : "3 / 4",
        minHeight: index === 0 ? "420px" : "280px",
        background: COLORS.greyDim,
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
    >
      {/* Portrait image */}
      <img
        src={speaker.image}
        alt={speaker.name}
        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        style={{ filter: "grayscale(20%)" }}
      />

      {/* Gradient overlay — bottom heavy */}
      <div
        className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-90"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)",
        }}
      />

      {/* Top-left number badge */}
      <div className="absolute top-5 left-5 z-20">
        <span
          style={{
            fontFamily: "OverpassMono, monospace",
            fontSize: "10px",
            letterSpacing: "0.3em",
            color: COLORS.red,
          }}
        >
          {num}
        </span>
      </div>

      {/* Crimson accent bar — bottom, expands on hover */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 z-20"
        style={{ background: COLORS.red }}
      />

      {/* Name + role stack — slides up on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
        <p
          className="text-xl font-bold leading-tight mb-1"
          style={{ fontFamily: "Cirka, serif", color: COLORS.white }}
        >
          {speaker.name}
        </p>
        <div className="flex items-center gap-2">
          <div
            className="w-0 h-[1px] group-hover:w-4 transition-all duration-500"
            style={{ background: COLORS.red }}
          />
          <p
            className="text-[10px] tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ fontFamily: "OverpassMono, monospace", color: "#aaa" }}
          >
            {speaker.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Test = () => {
  const [selectedSpeakerId, setSelectedSpeakerId] = useState(null);

  return (
    <div
      className="relative py-24 md:py-32 px-6 sm:px-10 md:px-16"
      style={{ background: COLORS.bg }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16"
        style={{ background: `linear-gradient(to bottom, transparent, ${COLORS.red}50, transparent)` }}
      />

      {/* Section header — asymmetric, left-heavy */}
      <div className="max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between flex-wrap gap-6"
        >
          <div>
            <span
              className="text-[10px] tracking-[0.4em] uppercase block mb-4"
              style={{ fontFamily: "OverpassMono, monospace", color: COLORS.red }}
            >
              04 — Speakers
            </span>
            <h2
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9]"
              style={{ fontFamily: "Cirka, serif", color: COLORS.white }}
            >
              The<br />
              <span style={{ color: COLORS.red }}>Voices</span>
            </h2>
          </div>
          <p
            className="max-w-xs text-sm leading-relaxed self-end"
            style={{ fontFamily: "Gilroy-Regular, sans-serif", color: COLORS.grey }}
          >
            Thought leaders, innovators, and change-makers sharing transformative ideas that challenge, inspire, and compel action.
          </p>
        </motion.div>
      </div>

      {/* Asymmetric grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 auto-rows-auto">
          {speakers.map((speaker, i) => (
            <SpeakerCard
              key={speaker.id}
              speaker={speaker}
              index={i}
              span={SPANS[i] ?? "md:col-span-1 md:row-span-1"}
              onClick={() => setSelectedSpeakerId(speaker.id)}
            />
          ))}
        </div>
      </div>

      {/* Speaker modal */}
      {selectedSpeakerId && (
        <SpeakerInfo
          speakerId={selectedSpeakerId}
          onClose={() => setSelectedSpeakerId(null)}
        />
      )}
    </div>
  );
};

export default Test;
