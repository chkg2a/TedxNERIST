import React from "react";
import "../css/Apus.css";

const ApusConstellation = () => {
  const scale = 3; // Adjust scale if needed

  const apusStars = [
    { id: 1, x: 800, y: 300, size: 3 * scale }, // Alpha (α) Apodis
    { id: 2, x: 600, y: 350, size: 3 * scale }, // Delta (δ) Apodis
    { id: 3, x: 450, y: 400, size: 3 * scale }, // Gamma (γ) Apodis
    { id: 4, x: 350, y: 250, size: 3 * scale }, // Beta (β) Apodis
  ];

  return (
    <div className="apus-constellation">
      <svg className="absolute w-full h-full">
        {/* Connecting Lines */}
        <polyline
          points={apusStars.map((star) => `${star.x},${star.y}`).join(" ")}
          stroke="white"
          strokeWidth={1 * scale}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className="animate-glow-line"
        />

        {/* Stars */}
        {apusStars.map((star) => (
          <circle
            key={star.id}
            cx={star.x}
            cy={star.y}
            r={star.size}
            fill="white"
            className="animate-glow-star"
          />
        ))}
      </svg>
    </div>
  );
};

export default ApusConstellation;
