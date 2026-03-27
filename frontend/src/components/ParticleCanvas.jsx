import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   PARTICLE CANVAS — 'Game of Life' Colonies (v7)
   ─────────────────────────────────────────────────────────────
   Visuals: Discrete dot grid governed by Cellular Automaton rules
   Behavior: 
     • GoL Rules: Birth (3), Survival (2-3), Death (others)
     • Aging: Cells fade in/out smoothly to avoid harsh jumps
     • Seeding: Random clusters are dropped to sustain the "life"
     • Non-Interactive: Purely cinematic background
   Performance: Bit-array simulation approach for 60fps rendering
═══════════════════════════════════════════════════════════════ */

const RED = { r: 235, g: 0, b: 40 };
const GRID_SPACING = 9;         // Grid spacing for CA cells
const DOT_SIZE = 5;             // Larger, more visible dots
const SIM_SPEED = 12;           // Frames between simulation steps
const FADE_SPEED = 0.04;        // Speed of aging transitions
const SEED_CHANCE = 0.035;      // Higher chance to drop seeds = more life

export default function ParticleCanvas({ isReady = false }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    grid: [],       // Current cell states (0 or 1)
    alphas: [],     // Render alphas for smoothing
    cols: 0,
    rows: 0,
    frame: 0,
    raf: null,
  });

  const getIndex = (x, y) => {
    const { cols, rows } = stateRef.current;
    if (x < 0) x = cols - 1; if (x >= cols) x = 0;
    if (y < 0) y = rows - 1; if (y >= rows) y = 0;
    return y * cols + x;
  };

  const seedCluster = (x, y) => {
    const { grid } = stateRef.current;
    for (let i = -2; i <= 2; i++) {
      for (let j = -2; j <= 2; j++) {
        if (Math.random() > 0.4) {
          const idx = getIndex(x + i, y + j);
          grid[idx] = 1;
        }
      }
    }
  };

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cols = Math.ceil(canvas.width / GRID_SPACING);
    const rows = Math.ceil(canvas.height / GRID_SPACING);
    const size = cols * rows;

    stateRef.current.cols = cols;
    stateRef.current.rows = rows;
    stateRef.current.grid = new Uint8Array(size);
    stateRef.current.alphas = new Float32Array(size).fill(0);

    // Initial Seeding — more seeds = more life on screen
    for (let k = 0; k < 22; k++) {
      seedCluster(Math.floor(Math.random() * cols), Math.floor(Math.random() * rows));
    }
  }, []);

  const simulate = () => {
    const { grid, cols, rows } = stateRef.current;
    const nextGrid = new Uint8Array(grid.length);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let neighbors = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            neighbors += grid[getIndex(x + i, y + j)];
          }
        }

        const idx = getIndex(x, y);
        if (grid[idx] === 1) {
          nextGrid[idx] = (neighbors === 2 || neighbors === 3) ? 1 : 0;
        } else {
          nextGrid[idx] = (neighbors === 3) ? 1 : 0;
        }
      }
    }

    stateRef.current.grid = nextGrid;

    // Sustenance Seeding
    if (Math.random() < SEED_CHANCE) {
      seedCluster(Math.floor(Math.random() * cols), Math.floor(Math.random() * rows));
    }
  };

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { grid, alphas, cols, rows, frame } = stateRef.current;

    // Run Simulation Step
    if (frame % SIM_SPEED === 0) {
      simulate();
    }
    stateRef.current.frame++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < grid.length; i++) {
      // 1. Update aging alpha (target 0.7 or 0)
      const target = grid[i] === 1 ? 0.75 : 0;
      if (alphas[i] < target) alphas[i] = Math.min(target, alphas[i] + FADE_SPEED);
      else if (alphas[i] > target) alphas[i] = Math.max(target, alphas[i] - FADE_SPEED);

      // 2. Render active cells
      if (alphas[i] > 0.01) {
        const x = (i % cols) * GRID_SPACING;
        const y = Math.floor(i / cols) * GRID_SPACING;
        // Radial dimming: particles near centre are dimmer
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
        const maxDist = Math.sqrt(cx ** 2 + cy ** 2);
        // t=0 at centre → dim; t=1 at corner → full
        const t = Math.min(dist / maxDist, 1);
        const dimFactor = 0.15 + 0.85 * t;
        const finalAlpha = alphas[i] * dimFactor;
        ctx.fillStyle = `rgba(${RED.r}, ${RED.g}, ${RED.b}, ${finalAlpha.toFixed(2)})`;
        ctx.fillRect(x - DOT_SIZE / 2, y - DOT_SIZE / 2, DOT_SIZE, DOT_SIZE);
      }
    }

    stateRef.current.raf = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    stateRef.current.raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(stateRef.current.raf);
    };
  }, [handleResize, animate]);

  return (
    <motion.canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        width: "100%",
        height: "100%",
      }}
      /* Bottom-to-top wipe: inset clips from the top, animating 100%→0%
         reveals particles starting at the bottom and sweeping upward */
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      animate={isReady
        ? { clipPath: "inset(0% 0% 0% 0%)" }
        : { clipPath: "inset(100% 0% 0% 0%)" }
      }
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
      aria-hidden="true"
    />
  );
}
