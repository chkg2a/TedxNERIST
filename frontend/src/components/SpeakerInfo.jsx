"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import speakers from "../constants/Speakers";

export default function SpeakerInfo({ speakerId, onClose }) {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  useEffect(() => {
    if (speakerId) {
      const speaker = speakers.find((s) => s.id === speakerId);
      setSelectedSpeaker(speaker || null);
    }
  }, [speakerId]);

  if (!selectedSpeaker) return null;

  const handleWatchNow = () => {
    if (selectedSpeaker.link) {
      window.open(selectedSpeaker.link, "_blank");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      style={{ fontFamily: "Gilroy-Regular" }}
    >
      <div
        className="bg-zinc-900 rounded-2xl shadow-lg p-6 sm:p-10 w-full max-w-5xl max-h-[90vh] sm:max-h-[90vh] overflow-y-auto relative
        max-sm:h-[95vh] max-sm:rounded-none"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-4xl font-bold w-10 h-10 flex items-center justify-center"
        >
          ×
        </button>

        {/* Content */}
        <main className="flex gap-20 items-start max-md:flex-col max-md:gap-10">
          {/* Speaker Profile Section */}
          <section className="flex flex-col gap-6 items-center flex-shrink-0 max-md:items-center max-md:text-center">
            <div className="rounded-full overflow-hidden w-[200px] h-[200px] relative">
              {selectedSpeaker.image ? (
                <img
                  src={selectedSpeaker.image}
                  alt={`${selectedSpeaker.name} profile`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-600 flex items-center justify-center text-gray-300 text-4xl">
                  {selectedSpeaker.name.charAt(0)}
                </div>
              )}
            </div>
            <h1
              className="text-4xl font-bold text-gray-200"
              style={{ fontFamily: "Cirka" }}
            >
              {selectedSpeaker.name}
            </h1>
            <p className="text-base text-gray-400 font-medium">
              {selectedSpeaker.description || "No description available."}
            </p>

            {/* Watch Now Button - Only show if link exists */}
            {selectedSpeaker.link && (
              <button
                onClick={handleWatchNow}
                className="mt-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M21.593 7.203a2.506 2.506 0 0 0-1.762-1.766C18.265 5.007 12 5 12 5s-6.264-.007-7.831.404a2.56 2.56 0 0 0-1.766 1.778C2.036 8.746 2 10.801 2 12c0 1.198.036 3.254.403 4.795.21.87.905 1.565 1.763 1.775 1.582.43 7.83.43 7.83.43s6.265.007 7.831-.403a2.51 2.51 0 0 0 1.767-1.763C22.036 15.254 22 13.199 22 12c0-1.2-.036-3.254-.407-4.797zm-11.592 7.797V9l5.195 3-5.195 3z" />
                </svg>
                Watch Now
              </button>
            )}
          </section>

          {/* Speaker Bio Section */}
          <article className="text-base text-gray-200 leading-relaxed max-w-2xl">
            {selectedSpeaker.bio ? (
              <p>{selectedSpeaker.bio}</p>
            ) : (
              <>
                <p className="mb-4">
                  {selectedSpeaker.name} is a renowned speaker with expertise in
                  their field. They have contributed significantly to various
                  projects and initiatives.
                </p>
                <p className="mb-4">
                  With years of experience, {selectedSpeaker.name} brings
                  valuable insights and perspectives to every discussion. Their
                  approach combines theoretical knowledge with practical
                  applications.
                </p>
                <p>
                  Audiences appreciate their engaging presentation style and
                  ability to communicate complex ideas in accessible ways. They
                  continue to inspire many through their work and public
                  speaking engagements.
                </p>
              </>
            )}
          </article>
        </main>
      </div>
    </div>
  );
}
