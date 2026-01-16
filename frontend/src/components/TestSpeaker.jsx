import React, { useState } from "react";
import PageDivider from "./PageDivider";
import { motion } from "framer-motion";
import speakers from "../constants/Speakers.js";
import SpeakerInfo from "./SpeakerInfo.jsx";
const Card = ({ id, dis, name, image, index, onClick }) => {
  const [originalFirst, originalLast] = name.split(" ");
  const firstName = originalFirst;
  const lastName = originalLast === "Pratap" ? "Kanwar" : originalLast;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative w-[200px] h-[360px] rounded-tl-[100px] overflow-hidden mx-auto sm:mx-2 cursor-pointer transform hover:scale-105 transition-transform duration-300"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-500 to-black z-0" />
      <img
        src={image}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover z-10"
      />
      <div className="absolute bottom-4 left-4 z-20 text-white leading-tight">
        <p className="text-xl font-serif">
          {firstName} {lastName}
        </p>
        <p className="text-sm italic opacity-80">{dis}</p>
      </div>
    </motion.div>
  );
};

const Test = () => {
  const [selectedSpeakerId, setSelectedSpeakerId] = useState(null);

  return (
    <div className="bg-[#1a1a1a] min-h-screen py-10">
      <PageDivider />
      <div className="w-full flex items-center justify-center translate-y-[-50%] ">
        <div className="container-reasons-title">
          <h1 className="reasons-title">Speakers</h1>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        {speakers.map((item, index) => (
          <Card
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            bio={item.bio}
            index={index}
            dis={item.description}
            onClick={() => setSelectedSpeakerId(item.id)}
          />
        ))}
      </div>

      {/* Modal rendering */}
      {selectedSpeakerId && (
        <SpeakerInfo
          speakerId={selectedSpeakerId}
          onClose={() => setSelectedSpeakerId(null)}
        />
      )}
    </div>
  );
};

export default Test;
