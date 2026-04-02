import { useEffect } from "react";
import { motion } from "framer-motion";
import previousSpeakers from "../constants/Speakers";
import "@fortawesome/fontawesome-free/css/all.min.css";

const SpeakersPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen text-white pt-28 pb-20 relative px-4 sm:px-8 lg:px-16" style={{ fontFamily: "Gilroy-Medium, sans-serif" }}>
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-red-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-red-900/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="text-[#e62b1e] font-semibold tracking-widest uppercase text-sm mb-3">Ideas Worth Spreading</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[#ececec]" style={{ fontFamily: "Cirka, serif" }}>Our Past Speakers</h1>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl">
            Meet the phenomenal individuals who have taken the TEDxNERIST stage to share their transformative stories and ideas with the world.
          </p>
        </motion.div>

        <div className="space-y-16">
          {previousSpeakers.map((speaker, idx) => (
            <motion.div
              key={speaker.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group flex flex-col md:flex-row bg-neutral-900/40 border border-white/5 rounded-[2rem] overflow-hidden hover:border-[#e62b1e]/30 transition-all duration-300"
            >
              {/* Image Section */}
              <div className="w-full md:w-1/3 aspect-[4/5] md:aspect-auto relative overflow-hidden bg-black/50">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=600&auto=format&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
              </div>

              {/* Content Section */}
              <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
                <p className="text-[#e62b1e] font-semibold text-sm tracking-widest uppercase mb-2">
                  {speaker.description}
                </p>
                <h2 className="text-3xl md:text-5xl font-bold text-[#ececec] mb-6" style={{ fontFamily: "Cirka, serif" }}>
                  {speaker.name}
                </h2>
                <div className="text-gray-300 leading-relaxed text-sm md:text-base space-y-4 mb-8 text-justify">
                  {speaker.bio}
                </div>
                
                {speaker.link && (
                  <div className="mt-auto">
                    <a
                      href={speaker.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-transparent border border-white/20 text-white hover:bg-[#e62b1e] hover:border-[#e62b1e] transition-all duration-300 text-sm font-semibold tracking-wide"
                    >
                      <i className="fa-brands fa-youtube text-lg"></i>
                      Watch their Talk
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpeakersPage;
