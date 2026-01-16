"use client";
import React from "react";
import ProfileGrid from "./ProfileGrid";
import { motion } from "framer-motion";

const PeopleSectionPhone = () => {
  return (
    <main className="flex overflow-hidden flex-col items-start pt-14 pl-9 mx-auto w-full leading-none text-white bg-zinc-900 max-w-[480px]">
      <header>
        <h1
          className="font-bold"
          style={{ fontFamily: "Cirka", fontSize: "4rem" }}
        >
          People.{" "}
        </h1>
        <p
          className="mt-2 text-base tracking-wider leading-6 text-gray-200"
          style={{ fontFamily: "Gilroy-Regular", fontSize: "1.3rem" }}
        >
          The great minds <br /> behind our event.
        </p>
      </header>

      {/* Animated Profile Grid */}
      <motion.div
        initial={{ opacity: 0, x: 50 }} // Start from the right
        animate={{ opacity: 1, x: 0 }} // Move to position
        transition={{
          duration: 0.6,
          ease: "easeOut",
          staggerChildren: 0.3, // Stagger effect for child elements
        }}
      >
        <ProfileGrid />
      </motion.div>
    </main>
  );
};

export default PeopleSectionPhone;
