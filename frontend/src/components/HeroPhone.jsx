import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import "../css/HeroPhone.css";
import Navbar from "./Navbar";

function HeroPhone() {
  const imageRef = useRef(null);
  const sectionRef = useRef(null);

  const [loadProgress, setLoadProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [text, setText] = useState("Illuminate the Unknown!");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrollComplete, setIsScrollComplete] = useState(false);
  const [textOpacity, setTextOpacity] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const isMobile = useMemo(
    () => /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent),
    []
  );
  const totalFrames = isMobile ? 90 : 90;
  const images = useRef(new Array(totalFrames).fill(null));

  const getFrameSrc = useCallback(
    (index) =>
      isMobile
        ? `/images/animation/phone/intro-phone${String(index).padStart(
            2,
            "0"
          )}.jpg`
        : `/images/animation/intro${String(index).padStart(2, "0")}.jpg`,
    [isMobile]
  );

  const changeTextWithTransition = useCallback(
    (newText) => {
      if (text === newText || isTransitioning) return;

      setIsTransitioning(true);
      setTextOpacity(0);

      setTimeout(() => {
        setText(newText);
        setTextOpacity(1);
        setIsTransitioning(false);
      }, 300);
    },
    [text, isTransitioning]
  );

  useEffect(() => {
    let isMounted = true;
    let loadedCount = 0;
    const tempImages = new Array(totalFrames).fill(null);

    const updateLoadProgress = () => {
      setLoadProgress(Math.floor((loadedCount / totalFrames) * 100));
    };

    const loadImages = async () => {
      await Promise.all(
        tempImages.map((_, i) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = getFrameSrc(i);
            img.onload = () => {
              if (!isMounted) return;
              tempImages[i] = img;
              loadedCount++;
              updateLoadProgress();
              resolve();
            };
            img.onerror = () => {
              if (!isMounted) return;
              console.warn(`Failed to load image: ${getFrameSrc(i)}`);
              loadedCount++;
              updateLoadProgress();
              resolve();
            };
          });
        })
      );

      if (isMounted) {
        images.current = tempImages;
        setImagesLoaded(true);
      }
    };

    loadImages();
    return () => (isMounted = false);
  }, [getFrameSrc]);

  useEffect(() => {
    if (imagesLoaded) {
      setTimeout(() => setLoadProgress(100), 300);
    }
  }, [imagesLoaded]);

  useEffect(() => {
    if (!imagesLoaded) return;

    const img = imageRef.current;
    const section = sectionRef.current;

    if (!img || !section) return;

    let animationFrame;

    const updateFrame = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      const newDistance = Math.max(0, scrollY - sectionTop);
      const newTotalScroll = Math.max(1, sectionHeight - viewportHeight);
      let newScrollProgress = Math.min(1, newDistance / newTotalScroll);

      setScrollProgress(newScrollProgress);
      setIsScrollComplete(newScrollProgress >= 0.95);

      if (newScrollProgress > 0.85) {
        changeTextWithTransition("Lighthouse Apus");
      } else if (newScrollProgress < 0.25) {
        changeTextWithTransition("Illuminate the Unknown!");
      } else if (newScrollProgress < 0.5) {
        changeTextWithTransition(
          "Driven by curiosity and bold innovation, we push boundaries."
        );
      } else if (newScrollProgress < 0.75) {
        changeTextWithTransition(
          "We explore the unknown with passion and a spirit of adventure."
        );
      } else {
        changeTextWithTransition(
          "Every idea sparks a new beginning, shaping endless possibilities."
        );
      }

      const frameIndex = Math.floor(newScrollProgress * (totalFrames - 1));

      if (
        images.current[frameIndex] &&
        img.src !== images.current[frameIndex].src
      ) {
        img.src = images.current[frameIndex].src;
      }

      animationFrame = requestAnimationFrame(updateFrame);
    };

    animationFrame = requestAnimationFrame(updateFrame);

    return () => cancelAnimationFrame(animationFrame);
  }, [imagesLoaded, changeTextWithTransition]);

  return (
    <>
      {!imagesLoaded ? (
        // Show only loading animation
        <div className="loading-overlay fixed inset-0 flex items-center justify-center z-50 bg-black">
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
      ) : (
        // Show main content only after loading completes
        <section className="vid" ref={sectionRef}>
          <Navbar />
          <div className="holder">
            <img
              ref={imageRef}
              src={getFrameSrc(0)}
              alt="Scroll Animation Frame"
              loading="eager"
            />
          </div>

          <div
            className={`fixed-text-container ${
              isScrollComplete ? "final-state" : ""
            }`}
            style={{
              position: "fixed",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
              textAlign: "center",
              pointerEvents: "none",
            }}
          >
            <h1
              className="lighthouse-text visible  "
              style={{
                opacity: textOpacity,
                transition:
                  "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
                fontFamily:
                  text === "Illuminate the Unknown!" ? "Cirka" : "Cirka",
                fontWeight:
                  text === "Illuminate the Unknown!" ? "bold" : "bold",
                fontSize:
                  text === "Illuminate the Unknown!" ||
                  text === "Lighthouse Apus"
                    ? "4rem"
                    : window.innerWidth >= 700
                    ? "2.5rem"
                    : "1.4rem",

                color:
                  text === "Illuminate the Unknown!" ? "#ececec" : "#ececec", // White for first text, light gray for others
              }}
            >
              {text}
            </h1>
          </div>
        </section>
      )}
    </>
  );
}

export default HeroPhone;
