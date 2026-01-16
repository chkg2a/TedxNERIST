import React, { useState, useEffect } from "react";

const Card = ({ title, subtitle, description, subdescription }) => {
  const [isPhone, setIsPhone] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsPhone(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const imageSrc = isPhone
    ? "/images/cards/Card-phone.svg"
    : "/images/cards/Card.svg";

  const hoverSrc = isPhone
    ? "/images/cards/Card-phone.svg"
    : "/images/cards/Card.svg";

  const currentSrc = isHovering ? hoverSrc : imageSrc;

  return (
    <div
      className="relative inline-block "
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ height: "/* Add your desired fixed height here */" }} // Option 1: Fixed height for the container
    >
      <img
        src={currentSrc}
        alt="Description of image"
        className="w-full h-auto transition-opacity duration-300"
        // style={{ height: '/* Add your desired fixed height here */' }} // Option 2: Fixed height for the image
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-opacity-50 flex flex-col justify-start p-6 card-title">
        <h1 className="text-xl">
          {title}
          <span className="text-black">{subtitle}</span>
        </h1>
        <div className="mt-4 text-white card-description">
          <p>{description}</p>
          <p>{subdescription}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
