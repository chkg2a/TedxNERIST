import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { about } from "../constants/About";

const COLORS = {
  bg: "#050505",
  panel: "#0b0b0b",
  panelSoft: "#111111",
  red: "#eb0028",
  white: "#f3f4f6",
  grey: "#d1d5db",
  greyDim: "#9ca3af",
  greyFaint: "#27272a",
};

const storyPillars = [
  {
    number: "01",
    title: "Curated Ideas",
    text: "Every edition is shaped around ideas that feel urgent, human, and relevant to the moment we are living in.",
  },
  {
    number: "02",
    title: "Regional Spotlight",
    text: "TEDxNERIST creates a stage for voices from the Northeast to be heard with the same clarity and ambition as anywhere else.",
  },
  {
    number: "03",
    title: "Shared Energy",
    text: "The event is not just about listening. It is about conversations, collisions, and inspiration that continue after the final talk ends.",
  },
];

const experienceMoments = [
  {
    label: "Talks",
    title: "Ideas from many disciplines",
    text: "Expect speakers from technology, design, leadership, social change, and creative practice.",
  },
  {
    label: "Performances",
    title: "Culture with emotional weight",
    text: "Live artistic moments bring movement, texture, and rhythm into the intellectual experience.",
  },
  {
    label: "Community",
    title: "Conversations that continue",
    text: "Students, faculty, creators, and professionals meet in a space built for reflection and connection.",
  },
];

const Reveal = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

const SectionLabel = ({ number, text }) => (
  <div className="flex items-center gap-4 mb-10 md:mb-14">
    <span
      className="text-[10px] tracking-[0.38em] uppercase"
      style={{ fontFamily: "OverpassMono, monospace", color: COLORS.red }}
    >
      {number}
    </span>
    <div className="w-8 h-px" style={{ background: COLORS.red }} />
    <span
      className="text-[10px] tracking-[0.3em] uppercase"
      style={{ fontFamily: "OverpassMono, monospace", color: COLORS.grey }}
    >
      {text}
    </span>
  </div>
);

function About() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden text-white" style={{ background: COLORS.bg }}>
      <div
        className="absolute top-28 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full pointer-events-none opacity-60"
        style={{ background: "radial-gradient(circle, rgba(235,0,40,0.12) 0%, transparent 68%)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 63px, rgba(255,255,255,0.25) 63px, rgba(255,255,255,0.25) 64px), repeating-linear-gradient(90deg, transparent, transparent 63px, rgba(255,255,255,0.25) 63px, rgba(255,255,255,0.25) 64px)",
        }}
      />

      <section className="relative px-6 sm:px-10 md:px-16 pt-32 md:pt-40 pb-24 md:pb-28">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SectionLabel number="01" text="About Page" />
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-end">
            <div className="lg:col-span-7">
              <Reveal delay={0.08}>
                <h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] max-w-4xl"
                  style={{ fontFamily: "Cirka, serif" }}
                >
                  Local voices.
                  <br />
                  <span style={{ color: COLORS.red }}>Global ideas.</span>
                  <br />
                  One TEDx stage at NERIST.
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <p
                  className="mt-8 max-w-2xl text-base md:text-lg leading-[1.9]"
                  style={{ fontFamily: "Gilroy-Regular, sans-serif", color: COLORS.grey }}
                >
                  TEDxNERIST is built as an experience where curiosity, courage, and creativity share the same room.
                  We gather speakers, artists, and audiences who are ready to question, imagine, and transform.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <p
                  className="mt-5 max-w-2xl text-sm md:text-base leading-[1.9]"
                  style={{ fontFamily: "Gilroy-Regular, sans-serif", color: COLORS.greyDim }}
                >
                  Rooted in Arunachal Pradesh and connected to the wider TEDx movement, the event celebrates ideas that
                  deserve both local resonance and global reach.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.2}>
                <div
                  className="relative rounded-[28px] border p-7 md:p-8 overflow-hidden"
                  style={{ background: "linear-gradient(180deg, rgba(17,17,17,0.98), rgba(10,10,10,0.95))", borderColor: "rgba(255,255,255,0.08)" }}
                >
                  <div
                    className="absolute inset-x-0 top-0 h-px"
                    style={{ background: "linear-gradient(to right, transparent, rgba(235,0,40,0.8), transparent)" }}
                  />
                  <span
                    className="text-[10px] tracking-[0.34em] uppercase block mb-5"
                    style={{ fontFamily: "OverpassMono, monospace", color: COLORS.red }}
                  >
                    2026 Theme
                  </span>
                  <p
                    className="text-2xl md:text-3xl leading-[1.15]"
                    style={{ fontFamily: "Cirka, serif", color: COLORS.white }}
                  >
                    Metamorphosis
                  </p>
                  <p
                    className="mt-4 text-sm leading-[1.85]"
                    style={{ fontFamily: "Gilroy-Regular, sans-serif", color: COLORS.grey }}
                  >
                    A call to embrace change, move through uncertainty, and emerge stronger, clearer, and more alive to possibility.
                  </p>
                  <div className="mt-8 flex items-center gap-3">
                    <div className="w-10 h-px" style={{ background: COLORS.red }} />
                    <span
                      className="text-[10px] tracking-[0.26em] uppercase"
                      style={{ fontFamily: "OverpassMono, monospace", color: COLORS.greyDim }}
                    >
                      Transform / Transcend / Triumph
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 sm:px-10 md:px-16 py-24 md:py-28">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SectionLabel number="02" text="Who We Are" />
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl leading-[1.05] max-w-3xl mb-14"
              style={{ fontFamily: "Cirka, serif" }}
            >
              Understanding the ecosystem behind <span style={{ color: COLORS.red }}>TEDxNERIST</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {about.map((item, index) => (
              <Reveal key={item.title + item.subtitle} delay={index * 0.08}>
                <article
                  className="h-full rounded-[24px] border p-7 md:p-8"
                  style={{ background: COLORS.panel, borderColor: "rgba(255,255,255,0.08)" }}
                >
                  <span
                    className="text-[10px] tracking-[0.34em] uppercase block mb-6"
                    style={{ fontFamily: "OverpassMono, monospace", color: COLORS.red }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3
                    className="text-2xl md:text-[2rem] leading-none"
                    style={{ fontFamily: "Cirka, serif", color: COLORS.white }}
                  >
                    {item.title}
                    {item.subtitle ? <span style={{ color: COLORS.red }}> {item.subtitle}</span> : null}
                  </h3>

                  <p
                    className="mt-6 text-sm leading-[1.85]"
                    style={{ fontFamily: "Gilroy-Regular, sans-serif", color: COLORS.grey }}
                  >
                    {item.description}
                  </p>
                  <p
                    className="mt-5 text-sm leading-[1.85]"
                    style={{ fontFamily: "Gilroy-Regular, sans-serif", color: COLORS.greyDim }}
                  >
                    {item.subdescription}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 sm:px-10 md:px-16 py-24 md:py-28">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel number="03" text="Why It Matters" />
            </Reveal>

            <Reveal delay={0.08}>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl leading-[1.08]"
                style={{ fontFamily: "Cirka, serif" }}
              >
                More than an event.
                <br />
                A <span style={{ color: COLORS.red }}>shared shift</span> in perspective.
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p
                className="mt-8 text-sm md:text-base leading-[1.9] max-w-xl"
                style={{ fontFamily: "Gilroy-Regular, sans-serif", color: COLORS.grey }}
              >
                TEDxNERIST is designed to leave people with more than applause. The goal is to spark reflection, deepen
                conversation, and create momentum that outlives the stage.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-6">
            {storyPillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={0.12 + index * 0.08}>
                <div
                  className="h-full rounded-[22px] border p-6"
                  style={{ background: COLORS.panelSoft, borderColor: COLORS.greyFaint }}
                >
                  <span
                    className="text-[10px] tracking-[0.34em] uppercase block mb-6"
                    style={{ fontFamily: "OverpassMono, monospace", color: COLORS.red }}
                  >
                    {pillar.number}
                  </span>
                  <h3
                    className="text-lg md:text-xl mb-4"
                    style={{ fontFamily: "Gilroy, sans-serif", color: COLORS.white }}
                  >
                    {pillar.title}
                  </h3>
                  <p
                    className="text-sm leading-[1.8]"
                    style={{ fontFamily: "Gilroy-Regular, sans-serif", color: COLORS.grey }}
                  >
                    {pillar.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 sm:px-10 md:px-16 py-24 md:py-28">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SectionLabel number="04" text="Experience" />
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
            <div className="lg:col-span-4">
              <Reveal delay={0.08}>
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl leading-[1.08]"
                  style={{ fontFamily: "Cirka, serif" }}
                >
                  What the day
                  <br />
                  <span style={{ color: COLORS.red }}>feels like</span>
                </h2>
              </Reveal>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {experienceMoments.map((item, index) => (
                <Reveal key={item.label} delay={0.12 + index * 0.08}>
                  <div className="border-t pt-5" style={{ borderColor: COLORS.greyFaint }}>
                    <span
                      className="text-[10px] tracking-[0.34em] uppercase block mb-4"
                      style={{ fontFamily: "OverpassMono, monospace", color: COLORS.red }}
                    >
                      {item.label}
                    </span>
                    <h3
                      className="text-lg mb-3"
                      style={{ fontFamily: "Gilroy, sans-serif", color: COLORS.white }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm leading-[1.8]"
                      style={{ fontFamily: "Gilroy-Regular, sans-serif", color: COLORS.grey }}
                    >
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 sm:px-10 md:px-16 pt-12 pb-28 md:pb-36">
        <Reveal>
          <div
            className="max-w-6xl mx-auto rounded-[30px] border px-6 py-10 sm:px-10 sm:py-12 md:px-12 md:py-14"
            style={{
              background: "linear-gradient(135deg, rgba(17,17,17,0.98), rgba(8,8,8,0.96))",
              borderColor: "rgba(255,255,255,0.08)",
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8">
                <span
                  className="text-[10px] tracking-[0.34em] uppercase block mb-5"
                  style={{ fontFamily: "OverpassMono, monospace", color: COLORS.red }}
                >
                  Join the experience
                </span>
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl leading-[1.08]"
                  style={{ fontFamily: "Cirka, serif" }}
                >
                  Ready to step into <span style={{ color: COLORS.red }}>TEDxNERIST</span>?
                </h2>
                <p
                  className="mt-5 max-w-2xl text-sm md:text-base leading-[1.85]"
                  style={{ fontFamily: "Gilroy-Regular, sans-serif", color: COLORS.grey }}
                >
                  Explore the event, register your seat, and become part of a community that believes powerful ideas can
                  change how we see ourselves and the world around us.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 lg:items-end">
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 0 60px rgba(235,0,40,0.24)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/register")}
                  className="group relative overflow-hidden rounded-full text-white font-semibold text-sm sm:text-base inline-flex items-center justify-center gap-2.5 cursor-pointer transition-all duration-300"
                  style={{ fontFamily: "Gilroy-Medium, sans-serif", padding: "16px 34px", background: COLORS.red }}
                >
                  <span className="relative z-10">Register Now</span>
                  <ArrowRight size={16} strokeWidth={2.5} className="relative z-10 group-hover:translate-x-0.5 transition-transform" />
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                </motion.button>

                <button
                  onClick={() => navigate("/contact")}
                  className="rounded-full border text-sm sm:text-base transition-colors duration-300 hover:bg-white/[0.04]"
                  style={{
                    fontFamily: "Gilroy-Medium, sans-serif",
                    padding: "16px 34px",
                    borderColor: "rgba(255,255,255,0.12)",
                    color: COLORS.white,
                  }}
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

export default About;
