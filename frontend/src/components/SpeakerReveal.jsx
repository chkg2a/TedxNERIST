import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import upcomingSpeakers from "../constants/UpcomingSpeakers";
import "../css/SpeakerReveal.css";

const COLORS = {
  bg: "#050505",
  red: "#eb0028",
  redDark: "#c20022",
  white: "#f0f0f0",
  grey: "#d1d5db",
  greyDim: "#9ca3af",
  greyFaint: "#4b5563",
};

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date();
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="countdown-container">
      {timeUnits.map((unit, idx) => (
        <div key={idx} className="countdown-unit">
          <span className="countdown-value" style={{ color: COLORS.red }}>
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="countdown-label" style={{ fontFamily: "OverpassMono, monospace", color: COLORS.greyDim }}>
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const SpeakerCard = ({ speaker, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isRevealed = new Date() >= new Date(speaker.revealDate);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="speaker-card"
    >
      <div className="speaker-image-wrapper">
        {isRevealed ? (
          <img src={speaker.image} alt={speaker.name} className="speaker-image" />
        ) : (
          <div className="speaker-silhouette">
            <CountdownTimer targetDate={speaker.revealDate} />
          </div>
        )}
      </div>
      <div className="speaker-info">
        {isRevealed ? (
          <>
            <h3 className="speaker-name" style={{ fontFamily: "Cirka, serif" }}>{speaker.name}</h3>
            <p className="speaker-title" style={{ fontFamily: "OverpassMono, monospace", color: COLORS.greyDim }}>{speaker.title}</p>
            <p className="speaker-bio" style={{ fontFamily: "Gilroy-Regular, sans-serif", color: COLORS.grey }}>{speaker.bio}</p>
          </>
        ) : (
          <>
            <h3 className="speaker-name" style={{ fontFamily: "Cirka, serif", color: COLORS.greyDim }}>Coming Soon</h3>
            <p className="speaker-title" style={{ fontFamily: "OverpassMono, monospace", color: COLORS.greyFaint }}>Speaker Reveal</p>
          </>
        )}
      </div>
    </motion.div>
  );
};

const SpeakerReveal = () => {
  return (
    <section className="speaker-reveal-section" style={{ backgroundColor: COLORS.bg }}>
      <div className="speaker-reveal-container">
        <div className="speaker-reveal-header">
          <span className="section-number" style={{ fontFamily: "OverpassMono, monospace", color: COLORS.red }}>04</span>
          <div className="section-line" style={{ backgroundColor: COLORS.red }} />
          <span className="section-text" style={{ fontFamily: "OverpassMono, monospace", color: COLORS.grey }}>Speakers</span>
        </div>

        <h2 className="speaker-reveal-title" style={{ fontFamily: "Cirka, serif" }}>
          Voices of <span style={{ color: COLORS.red }}>Transformation</span>
        </h2>

        <p className="speaker-reveal-subtitle" style={{ fontFamily: "Gilroy-Regular, sans-serif", color: COLORS.grey }}>
          Meet the extraordinary minds who will share their stories of metamorphosis on our stage.
        </p>

        <div className="speakers-grid">
          {upcomingSpeakers.map((speaker, index) => (
            <SpeakerCard key={speaker.id} speaker={speaker} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeakerReveal;
