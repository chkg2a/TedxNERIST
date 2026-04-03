import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const tedxRed = "#eb0028";
const tedxRedDim = "rgba(235, 0, 40, 0.15)";
const borderDefault = "rgba(255, 255, 255, 0.08)";

const ContactInfo = ({ icon: Icon, title, content, link, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="flex items-start gap-4 p-4 rounded-xl bg-[#111111] group hover:bg-[#161616] transition-colors duration-500"
    style={{ border: `1px solid ${borderDefault}` }}
  >
    <div 
      className="p-2 sm:p-2.5 rounded-lg transition-colors duration-500 group-hover:bg-[#eb0028]" 
      style={{ backgroundColor: tedxRedDim, color: "#d1d5db" }}
    >
      <Icon size={18} className="group-hover:text-white transition-colors duration-500" />
    </div>
    <div className="flex-1">
      <h3 
        className="text-[8px] sm:text-[9px] font-bold tracking-[0.2em] uppercase mb-1.5" 
        style={{ color: "#d1d5db", fontFamily: "OverpassMono, monospace" }}
      >
        {title}
      </h3>
      {link ? (
        <a 
          href={link} 
          className="text-sm md:text-base text-white hover:text-[#eb0028] transition-colors block font-semibold" 
          style={{ fontFamily: "Gilroy-Medium, sans-serif" }}
        >
          {content}
        </a>
      ) : (
        <p 
          className="text-sm md:text-base text-white font-semibold" 
          style={{ fontFamily: "Gilroy-Medium, sans-serif", lineHeight: 1.4 }}
        >
          {content}
        </p>
      )}
    </div>
  </motion.div>
);

const ContactUs = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] w-full bg-[#050505] flex items-center justify-center p-4 py-12 relative overflow-hidden">
      {/* Background Graphic elements */}
      <div 
        className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-5 -translate-x-1/2 -translate-y-1/2 mix-blend-screen blur-[100px]" 
        style={{ background: tedxRed }} 
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 22px, rgba(255,255,255,0.18) 22px, rgba(255,255,255,0.18) 23px), repeating-linear-gradient(90deg, transparent, transparent 22px, rgba(255,255,255,0.18) 22px, rgba(255,255,255,0.18) 23px)",
        }}
      />
      
      {/* The Central Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl p-6 sm:p-8 md:p-10 rounded-3xl bg-[#0a0a0a] relative z-10 shadow-2xl"
        style={{ border: `1px solid ${borderDefault}` }}
      >
        <div className="mb-8 pl-1">
          <span 
            className="text-[8px] sm:text-[9px] font-bold tracking-[0.3em] uppercase block mb-3" 
            style={{ color: tedxRed, fontFamily: "OverpassMono, monospace" }}
          >
            Get In Touch
          </span>
          <h2 
            className="text-3xl md:text-5xl text-white mb-3 leading-none" 
            style={{ fontFamily: "Cirka, serif" }}
          >
            Contact
          </h2>
          <p 
            className="max-w-xl text-gray-300 text-sm sm:text-base leading-relaxed" 
            style={{ fontFamily: "Gilroy-Regular, sans-serif" }}
          >
            Have questions about the event, ticketing, or partnerships? Reach out to our team at TEDxNERIST.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Contact Details List */}
          <div className="flex flex-col gap-3">
            <ContactInfo 
              icon={Mail} 
              title="Email" 
              content="tedx@nerist.ac.in" 
              link="mailto:tedx@nerist.ac.in" 
              delay={0.1}
            />
            <ContactInfo 
              icon={Phone} 
              title="Phone" 
              content="+91 88220 78464" 
              link="tel:+918822078464" 
              delay={0.2}
            />
            <ContactInfo 
              icon={MapPin} 
              title="Address" 
              content={
                <>
                  Silver Jubilee Hall, NERIST<br />
                  Nirjuli, AP 791109
                </>
              } 
              delay={0.3}
            />
            <ContactInfo 
              icon={Clock} 
              title="Business Hours" 
              content="Mon - Fri: 9:00 AM - 6:00 PM" 
              delay={0.4}
            />
          </div>

          {/* Map Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full h-64 md:h-auto min-h-[300px] rounded-2xl overflow-hidden relative group"
            style={{ border: `1px solid ${borderDefault}`, backgroundColor: "#111" }}
          >
            {/* Overlay to darken map for aesthetic */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none z-10 group-hover:bg-transparent transition-colors duration-700" />
            
            <iframe
              title="TEDx NERIST Location"
              width="100%"
              height="100%"
              className="absolute inset-0 saturate-50 contrast-110 opacity-90 group-hover:saturate-100 group-hover:opacity-100 transition-all duration-700"
              style={{ border: 0 }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3551.018267921977!2d93.73825807544681!3d27.12423457652173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3743ff771f0446b5%3A0x14fa96c700366cf5!2sNERIST%20Auditorium!5e0!3m2!1sen!2sin!4v1743936802339!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactUs;
