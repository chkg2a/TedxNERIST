import React, { useState, useEffect } from "react";

const StarCluster = () => {
  const [center, setCenter] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const [stars, setStars] = useState([]);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateDimensions = () => {
      const minDimension = Math.min(window.innerWidth, window.innerHeight);
      setCenter({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
      setScale(minDimension / 1000); // Adjusts size proportionally (1000 is the base reference)
    };

    window.addEventListener("resize", updateDimensions);
    updateDimensions(); // Initial update

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const generateStars = () => {
      const numStars = 100;
      const newStars = Array.from({ length: numStars }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 2,
      }));
      setStars(newStars);
    };

    generateStars();
  }, []);

  // Apus constellation star coordinates (scaled)
  const baseApusStars = [
    { name: "α", x: 250, y: 100 },
    { name: "β", x: -200, y: 0 },
    { name: "γ", x: -250, y: 100 },
    { name: "δ", x: 0, y: 50 },
  ];

  const apusStars = baseApusStars.map((star) => ({
    ...star,
    x: center.x + star.x * scale,
    y: center.y + star.y * scale,
    size: 5 * scale, // Scale star sizes too
  }));

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
      {/* Background Stars */}
      {stars.map((star, index) => (
        <div
          key={index}
          className="absolute bg-white rounded-full twinkle-star"
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            "--random-delay": star.delay,
          }}
        />
      ))}

      {/* Apus Constellation
      <svg className="absolute w-full h-full">
        <polyline
          points={apusStars.map((star) => `${star.x},${star.y}`).join(" ")}
          stroke="white"
          strokeWidth={1 * scale} // Scale line thickness
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className="animate-glow-line"
        />
        {apusStars.map((star, index) => (
          <circle
            key={index}
            cx={star.x}
            cy={star.y}
            r={star.size}
            fill="white"
            className="animate-glow-star"
          />
        ))}
      </svg> */}
    </div>
  );
};

export default StarCluster;
