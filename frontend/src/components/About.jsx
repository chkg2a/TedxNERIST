import React, { useEffect, useRef } from "react";
import Card from "./Card";
import "../css/About.css";
import { about } from "../constants/About";
import "../css/ReasonsToAttend.css";
import PageDivider from "./PageDivider";
import { motion, useAnimation } from "framer-motion";

const About = () => {
  return (
    <div id="about" className="min-h-screen relative">
      {/* PageDivider Positioned Slightly Higher on Mobile */}
      <div className="relative -mt-8 sm:-mt-10 md:-mt-12 lg:-mt-16">
        <PageDivider />
      </div>

      {/* Title Positioned for Overlap */}
      <div className="w-full flex items-center justify-center relative -mt-10 sm:-mt-12 md:-mt-16 lg:-mt-20">
        <div className="container-reasons-title">
          <h1 className="reasons-title">About Us</h1>
        </div>
      </div>

      {/* Cards Section with In-View Animation */}
      <div className="container-about-us">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
          {about.map((card, id) => (
            <AnimatedCard key={id} card={card} id={id} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Separate component for each card with custom intersection observer
const AnimatedCard = ({ card, id }) => {
  const controls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the element is visible
        if (entry.isIntersecting) {
          controls.start({
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.7,
              delay: id * 0.5,
              ease: "easeOut",
            },
          });
          // Unobserve after animation has been triggered
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.2, rootMargin: "-50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls, id]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={controls}>
      <Card
        title={card.title}
        subtitle={card.subtitle}
        description={card.description}
        subdescription={card.subdescription}
      />
    </motion.div>
  );
};

export default About;
