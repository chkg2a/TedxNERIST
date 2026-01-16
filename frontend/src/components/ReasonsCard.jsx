import React from "react";

const ReasonsCard = ({ id, title, image, description }) => {
  return (
    <div className="container-reasons-card relative group">
      <div className="group container-reasons-card overflow-hidden rounded-full">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-all duration-1000 grayscale group-hover:grayscale-0 reasons-image"
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
        <div className="absolute top-[4rem] rounded-full border-[2px] bg-[#C23B22] w-12 h-12 flex items-center justify-center opacity-40">
          {id}
        </div>
        <div className="absolute top-[4rem] rounded-full border-[2px] border-[#C23B22] w-12 h-12 flex items-center justify-center">
          {id}
        </div>
        <div className="absolute top-[9rem] flex justify-center">
          <h1 className="reasons-card-title">{title}</h1>
        </div>
        <div className="absolute bottom-[4rem] flex justify-center">
          <p className="reasons-card-description">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ReasonsCard;
