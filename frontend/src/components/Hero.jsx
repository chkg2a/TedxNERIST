import React, { useEffect, useRef, useState } from "react";
import "../css/Hero.css";
import { Navbar } from "./";

function Hero() {
  const imageRef = useRef(null);
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const divRef = useRef(null);
  const totalFrames = 60;
  const images = useRef([]);

  const [loadProgress, setLoadProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(true);

  const getFrameSrc = (index) =>
    `/images/animation/intro${String(index).padStart(2, "0")}.jpg`;

  useEffect(() => {
    let loadedCount = 0;
    const promises = [];

    for (let i = 0; i < totalFrames; i++) {
      const promise = new Promise((resolve, reject) => {
        const img = new Image();
        img.src = getFrameSrc(i);
        img.onload = () => {
          loadedCount++;
          setLoadProgress(Math.floor((loadedCount / totalFrames) * 100));
          images.current[i] = img;
          resolve();
        };
        img.onerror = reject;
      });
      promises.push(promise);
    }

    Promise.all(promises)
      .then(() => setImagesLoaded(true))
      .catch((error) => console.error("Error preloading images:", error));
  }, []);

  useEffect(() => {
    if (imagesLoaded) {
      const timer = setTimeout(() => setShowLoadingOverlay(false), 300);
      return () => clearTimeout(timer);
    }
  }, [imagesLoaded]);

  useEffect(() => {
    if (!imagesLoaded) return;

    const img = imageRef.current;
    const section = sectionRef.current;
    const text = textRef.current;
    const div = divRef.current;
    if (!img || !section || !text) return;

    let animationFrame;

    const updateFrame = () => {
      const distance = window.scrollY - section.offsetTop;
      const totalScroll = section.clientHeight - window.innerHeight;
      let scrollProgress = distance / totalScroll;
      scrollProgress = Math.max(0, Math.min(scrollProgress, 1));

      const frameIndex = Math.floor(scrollProgress * (totalFrames - 1));
      img.src = images.current[frameIndex]?.src || img.src;

      text.style.opacity = Math.min(1, scrollProgress * 2);
      div.style.opacity = Math.min(1, scrollProgress * 2);

      animationFrame = requestAnimationFrame(updateFrame);
    };

    const handleScroll = () => {
      if (!animationFrame) {
        animationFrame = requestAnimationFrame(updateFrame);
      }
    };

    window.addEventListener("scroll", handleScroll);
    updateFrame();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrame);
    };
  }, [imagesLoaded]);

  return (
    <>
      <section className="vid" ref={sectionRef}>
        {showLoadingOverlay == false && <Navbar />}
        <div className="holder">
          <img
            ref={imageRef}
            src={getFrameSrc(0)}
            alt="Scroll Animation Frame"
          />
        </div>
        <h1 ref={textRef} className="lighthouse-text absolute bottom-48 left-0">
          LIGHTHOUSE APUS
        </h1>
        <div ref={divRef} className="absolute -bottom-192 left-0">
          <h1 className="lighthouse-text">
            LIGHTHOUSE NEXT HEADING
          </h1>
          <p className="lighthouse-para">This is the paragraph</p>
        </div>
      </section>
      {showLoadingOverlay && (
        <div className="loading-overlay fixed inset-0 flex items-center justify-center z-50 miau">
          <span
            className="relative text-7xl"
            style={{ fontFamily: "Gilroy", color: "grey", opacity: "70%" }}
          >
            TEDxNERIST
            <span
              className="absolute top-0 left-0 loading-text overflow-hidden"
              style={{
                width: `${loadProgress}%`,
                transition: "width 0.5s ease",
              }}
            >
              TEDx<span style={{ color: "white" }}>NERIST</span>
            </span>
          </span>
        </div>
      )}
    </>
  );
}

export default Hero;
