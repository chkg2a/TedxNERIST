import React from "react";
import { reasons } from "../constants/Reasons";
import "../css/ReasonsToAttend.css";
import { useState, useEffect } from "react";
import PageDivider from "./PageDivider";
import ReasonsCard from "./ReasonsCard";

const ReasonsToAttend = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-[100vh]">
      <div className="relative -mt-8 sm:-mt-10 md:-mt-12 lg:-mt-16">
        <PageDivider />
      </div>
      <div className="w-full flex items-center justify-center relative -mt-10 sm:-mt-12 md:-mt-16 lg:-mt-20">
        <div className="container-reasons-title">
          <h1 className="reasons-title">Reasons to Attend</h1>
        </div>
      </div>
      <div className="flex justify-center mt-18">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason) => (
            <ReasonsCard
              key={reason.id}
              id={reason.id}
              title={reason.title}
              image={reason.image}
              description={reason.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReasonsToAttend;
