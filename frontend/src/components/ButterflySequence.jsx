import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   BUTTERFLY SEQUENCE — Cinematic Reveal (v14)
   ─────────────────────────────────────────────────────────────
   Phase 1 — SPLASH:  static first frame while all 85 frames load.
   Phase 2 — PLAY:    24fps animation once all loaded.
   Phase 3 — FADEOUT: black bg fades out; canvas dims & drops to
              z-0 so the last butterfly frame lingers as a ghost
              background behind the hero. onDone() fires here.
═══════════════════════════════════════════════════════════════ */

const FRAME_COUNT = 75;
const MS_PER_FRAME = 1000 / 24;

const SPLASH = "splash";
const PLAYING = "playing";
const FADEOUT = "fadeout";
const DONE = "done";

export default function ButterflySequence({ onDone }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const frameRef = useRef(0);
  const lastTimeRef = useRef(0);
  const rafIdRef = useRef(null);
  const doneRef = useRef(false);

  const [phase, setPhase] = useState(SPLASH);

  // ── 1. PRELOAD ─────────────────────────────────────────────────
  useEffect(() => {
    let loaded = 0;
    const images = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new Image();
      img.src = `/seq_q/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`;
      img.onload = () => {
        loaded++;
        if (i === 0) paintFrame(img);
        if (loaded === FRAME_COUNT) setPhase(PLAYING);
      };
      return img;
    });
    imagesRef.current = images;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── 2. PLAY ────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== PLAYING) return;
    frameRef.current = 0;
    lastTimeRef.current = 0;
    doneRef.current = false;

    const render = (time) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = time - lastTimeRef.current;
      if (delta >= MS_PER_FRAME) {
        lastTimeRef.current = time - (delta % MS_PER_FRAME);
        const img = imagesRef.current[frameRef.current];
        if (img) paintFrame(img);
        frameRef.current++;
        if (frameRef.current >= FRAME_COUNT) {
          if (!doneRef.current) {
            doneRef.current = true;
            setTimeout(() => setPhase(FADEOUT), 300);
          }
          return;
        }
      }
      rafIdRef.current = requestAnimationFrame(render);
    };
    rafIdRef.current = requestAnimationFrame(render);
    return () => { if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current); };
  }, [phase]);

  // ── 3. FADEOUT: black bg gone in 900ms, then signal done ───────
  useEffect(() => {
    if (phase !== FADEOUT) return;
    const timer = setTimeout(() => {
      setPhase(DONE);
      onDone();
    }, 950);
    return () => clearTimeout(timer);
  }, [phase, onDone]);

  // ── Helper ─────────────────────────────────────────────────────
  const paintFrame = (img) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const MAX_W = Math.min(window.innerWidth * 0.7, 300);
    const targetH = MAX_W * (img.height / img.width);
    const x = (canvas.width - MAX_W) / 2;
    const y = (canvas.height - targetH) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, MAX_W, targetH);
  };

  // ── Resize ─────────────────────────────────────────────────────
  useEffect(() => {
    const resize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      const img = imagesRef.current[Math.max(0, frameRef.current - 1)];
      if (img) paintFrame(img);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isSeqDone = phase === DONE;

  return (
    // Wrapper: z-[80] during sequence → z-0 after done (behind hero)
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: isSeqDone ? 0 : 80 }}
    >
      {/* Black background — fades out after sequence */}
      <motion.div
        className="absolute inset-0 bg-[#050505]"
        animate={{ opacity: phase === FADEOUT || phase === DONE ? 0 : 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Canvas — blurs on entry, clears during animation, blurs on exit,
          then dims to a soft ghost behind the hero */}
      <motion.canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        animate={{
          opacity: isSeqDone ? 0.10 : 1,
          filter:
            phase === SPLASH  ? "blur(16px)" :
            phase === PLAYING ? "blur(0px)"  :
            phase === FADEOUT ? "blur(20px)" :
                                "blur(6px)",  // DONE ghost
        }}
        transition={{ duration: phase === PLAYING ? 0.6 : 1.0, ease: "easeInOut" }}
      />
    </div>
  );
}
