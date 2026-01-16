import React from "react";
import ProfileCard from "./ProfileCard";
import { Members } from "../../../constants/Team.js";
import "../../../css/ProfileGrid.css";

const ProfileGrid = () => {
  const chunkSize = 3;
  const totalRows = Math.ceil(Members.length / chunkSize);
  const emptySlots = totalRows * chunkSize - Members.length; // Calculate placeholders

  return (
    <section
      className="px-9 pt-9 pb-9 mt-9 w-full text-center bg-neutral-800 "
      style={{ borderRadius: " 35px 0px 0px 0px" }}
    >
      <div className="grid grid-cols-3 gap-6">
        {Members.map((member, index) => (
          <ProfileCard key={index} {...member} />
        ))}
        {/* Fill empty slots to maintain alignment but not affect height */}
        {Array.from({ length: emptySlots }).map((_, index) => (
          <div key={`empty-${index}`} className="hidden" />
        ))}
      </div>
    </section>
  );
};

export default ProfileGrid;
