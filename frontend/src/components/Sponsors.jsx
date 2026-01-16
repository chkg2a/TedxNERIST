import React from "react";
import "../css/Sponsors.css";
import { sponsors } from "../constants/Sponsors";
import "../css/ReasonsToAttend.css";
import PageDivider from "./PageDivider";

const Sponsors = () => {
  return (
    <div className="mb-20 relative">
      {/* PageDivider Positioned Slightly Higher on Mobile */}
      <div className="relative -mt-8 sm:-mt-10 md:-mt-12 lg:-mt-16 page-container">
        <PageDivider />
      </div>

      {/* Title Positioned for Overlap */}
      <div className="w-full flex items-center justify-center relative -mt-10 sm:-mt-12 md:-mt-16 lg:-mt-20">
        <div className="container-reasons-title">
          <h1 className="reasons-title">Sponsors</h1>
        </div>
      </div>

      {/* Cards Section (No Width Change) */}
      <div className="sponsors-container pt-12 sm:pt-16 md:pt-20 lg:pt-24 mt-20">
        <div className="sponsors-wrapper">
          <div className="sponsors-marquee">
            {[...sponsors, ...sponsors].map((sponsor, index) => (
              <img
                key={index}
                src={sponsor.logo}
                alt={sponsor.name}
                className="sponsor-logo"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
