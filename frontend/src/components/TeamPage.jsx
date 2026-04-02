import { useEffect } from "react";
import { motion } from "framer-motion";
import { categorizedTeam } from "../constants/Team";
import "@fortawesome/fontawesome-free/css/all.min.css";

const TeamPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen text-white pt-28 pb-20 relative px-4 sm:px-8 lg:px-16" style={{ fontFamily: "Gilroy-Medium, sans-serif" }}>
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-red-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-red-900/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-8xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="text-[#e62b1e] font-semibold tracking-widest uppercase text-sm mb-3">The People Behind the Stage</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[#ececec]" style={{ fontFamily: "Cirka, serif" }}>Our Team</h1>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl">
            TEDxNERIST is wholly volunteer-driven. These are the passionate students who spend countless hours making the magic happen.
          </p>
        </motion.div>

        <div className="space-y-24 max-w-7xl mx-auto">
          {categorizedTeam.map((teamCategory, catIndex) => (
            <div key={catIndex} className="team-category">
              <motion.h2 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-semibold mb-10 border-l-4 border-[#e62b1e] pl-4 py-1"
                style={{ fontFamily: "Cirka, serif" }}
              >
                {teamCategory.category}
              </motion.h2>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                {teamCategory.members.map((member, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex flex-col group cursor-default"
                  >
                    <div className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-4 bg-neutral-900/50 border border-white/5 transition-all duration-300 group-hover:border-[#e62b1e]/50">
                      <img
                        src={member.img}
                        alt={member.name}
                        className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=600&auto=format&fit=crop";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                      
                      {/* Social Links on Hover */}
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
                         {member.linkedin ? (
                           <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-[#e62b1e] hover:border-[#e62b1e] transition-colors cursor-pointer">
                             <i className="fab fa-linkedin-in text-white/90 text-sm"></i>
                           </a>
                         ) : null}
                         {member.instagram ? (
                           <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-[#e62b1e] hover:border-[#e62b1e] transition-colors cursor-pointer">
                             <i className="fab fa-instagram text-white/90 text-sm"></i>
                           </a>
                         ) : null}
                      </div>
                    </div>
                    
                    <div className="text-center sm:text-left pl-1">
                      <h3 className="text-[1.1rem] md:text-xl font-bold text-white/90 group-hover:text-white mb-2 leading-tight" style={{ fontFamily: "Cirka, serif" }}>
                        {member.name}
                      </h3>
                      <p className="text-xs md:text-sm text-[#e62b1e] font-medium tracking-wide">
                        {member.role}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
