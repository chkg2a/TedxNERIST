import React, { useState, useEffect } from "react";
import ThreeDViewer from "./ThreeDViewer";
import "../css/Theme.css";

const useIsPhone = () => {
  const [isPhone, setIsPhone] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsPhone(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isPhone;
};

const Theme = () => {
  const isPhone = useIsPhone();

  return (
    <>
      <div className="flex flex-col md:flex-row items-start justify-center p-8 text-white mx-0 relative w-full">
        {/* Left Side - Image */}
        <div className="w-full md:w-[15%] md:absolute top-6 flex flex-col justify-start left-0">
          <img
            src="/images/theme2025.svg"
            alt="Theme 2025"
            className="h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Right Side - Text */}
        <div className="w-full text-left px-0 md:ml-[20%] mt-[1%] flex flex-col gap-12 pl-5">
          <p className="mt-3 theme-text mr-0 md:leading-14 relative">
            <span className="theme-text-quotation translate-x-[-1.5rem] translate-y-[-0.5rem] moded-text"></span>
            <span className="italic">Lighthouse Apus</span> embodies a radiant
            beacon, illuminating pathways toward imaginative discovery and
            guiding explorers through uncharted realms with clarity and purpose.
            Inspired by the awe-inspiring constellation Apus—an elegant, vibrant
            bird-of-paradise soaring gracefully across the southern heavens—it
            symbolizes boundless curiosity, unbridled ambition, and the
            courageous desire to venture into unexplored horizons. Seamlessly
            merging the innovative spirit of technology's Accelerated Processing
            Unit (APU) with a mosaic of diverse talents, perspectives, and
            creative visions, Lighthouse Apus accelerates ingenuity, propelling
            groundbreaking ideas forward. Ultimately, Lighthouse Apus shines a
            dazzling light upon daring innovation, fostering collaborative
            creativity, and uniting unique abilities in an inspired journey
            toward boundless possibilities.
            <span className="theme-text-quotation rotate-180 bottom-[0.5rem]"></span>
          </p>
        </div>
      </div>
    </>
  );
};
const PhoneTheme = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-white w-full pb-[15%]">
      {/* Image Section */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4">
        <img
          src="/images/theme2025-phone.png"
          alt="Theme 2025"
          className="w-[60%] sm:w-[40%] h-auto rounded-lg shadow-lg mb-2"
        />
        <img
          src="/logo.png"
          alt="Theme 2025"
          className=" w-40 justify-center rounded-lg shadow-lg"
        />
      </div>

      {/* Text Section */}
      <div className="w-full text-center mt-8 px-4 flex flex-col gap-6">
        <p className="theme-text leading-7 relative">
          <span className="theme-text-quotation translate-x-[-1.5rem] translate-y-[-0.5rem]"></span>
          <span className="italic">Lighthouse Apus</span> is a beacon of
          exploration, guiding through uncharted realms. Inspired by Apus, the
          vibrant bird-of-paradise, it symbolizes curiosity and ambition.
          <span className="theme-text-quotation rotate-180"></span>
        </p>
      </div>
    </div>
  );
};

// Automatically choose the right component
const ResponsiveTheme = () => {
  const isPhone = useIsPhone();
  return isPhone ? <PhoneTheme /> : <Theme />;
};

export default ResponsiveTheme;
