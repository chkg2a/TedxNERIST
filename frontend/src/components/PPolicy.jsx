import Navbar from "./Navbar";
import Footer from "./Footer";

const COLORS = {
  bg: "#050505",
  red: "#eb0028",
  white: "#f0f0f0",
  grey: "#d1d5db",
  greyDim: "#9ca3af",
  greyFaint: "#4b5563",
};

const sections = [
  {
    title: "What Do We Do With Your Information?",
    content: [
      "When you register for our event, we collect personal information such as your name, email address, institution, and contact details as part of the registration process.",
      "We also automatically receive your IP address to help us learn about your browser and operating system.",
      "With your permission, we may send you emails about our event, updates, and other communications related to TEDxNERIST.",
    ],
  },
  {
    title: "Consent",
    content: [
      "When you provide us with personal information to complete a registration, we imply that you consent to our collecting it for that specific reason only.",
      "If we ask for personal information for marketing, we will either ask you directly for expressed consent or provide an option to say no.",
    ],
    subsections: [
      {
        subtitle: "How do I withdraw my consent?",
        text: "You may withdraw your consent anytime by contacting us at tedx@nerist.ac.in or mailing us at NERIST, Nirjuli, Arunachal Pradesh 791109.",
      },
    ],
  },
  {
    title: "Disclosure",
    content: [
      "We may disclose your personal information if required by law or if you violate our Terms of Service.",
    ],
  },
  {
    title: "Third-Party Services",
    content: [
      "Third-party providers collect, use, and disclose your information only as necessary to perform their services. We recommend reviewing their privacy policies.",
    ],
  },
  {
    title: "Security",
    content: [
      "We take reasonable precautions and follow industry best practices to protect your personal information from misuse or loss.",
    ],
  },
  {
    title: "Cookies",
    content: [
      "We use cookies to maintain user sessions. They do not personally identify you on other websites.",
    ],
  },
  {
    title: "Age of Consent",
    content: [
      "By using this site, you confirm that you are at least the age of majority in your state or province, or have consent from a guardian.",
    ],
  },
  {
    title: "Changes to This Privacy Policy",
    content: [
      "We reserve the right to modify this policy at any time. Changes take effect immediately upon posting.",
    ],
  },
];

const PrivacyPolicy = () => {
  return (
    <div style={{ background: COLORS.bg }} className="min-h-screen text-white">
      <Navbar />

      {/* ── Spacer for fixed navbar ── */}
      <div className="h-[72px]" />

      {/* ── Hero header ── */}
      <section className="relative px-4 sm:px-10 md:px-16 pt-16 sm:pt-24 md:pt-32 pb-10 sm:pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Section label */}
          <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
            <span
              className="text-[10px] tracking-[0.4em] uppercase"
              style={{ fontFamily: "OverpassMono, monospace", color: COLORS.red }}
            >
              Legal
            </span>
            <div className="w-8 h-px" style={{ background: COLORS.red }} />
            <span
              className="text-[10px] tracking-[0.3em] uppercase"
              style={{ fontFamily: "OverpassMono, monospace", color: COLORS.grey }}
            >
              Privacy
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] mb-5 sm:mb-8"
            style={{ fontFamily: "Cirka, serif" }}
          >
            Privacy <span style={{ color: COLORS.red }}>Statement</span>
          </h1>

          <p
            className="text-sm sm:text-base md:text-lg leading-[1.85] max-w-2xl"
            style={{ fontFamily: "Gilroy-Regular, sans-serif", color: COLORS.grey }}
          >
            Your privacy is important to us. This policy outlines how TEDxNERIST
            collects, uses, and protects your personal information.
          </p>
        </div>
      </section>

      {/* ── Sections ── */}
      <section className="relative px-4 sm:px-10 md:px-16 pb-20 sm:pb-32">
        <div className="max-w-4xl mx-auto">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="py-8 sm:py-10 border-t group"
              style={{ borderColor: `${COLORS.greyFaint}50` }}
            >
              {/* Number + Title row */}
              <div className="flex items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
                <span
                  className="text-[10px] tracking-[0.3em] shrink-0 mt-1.5 sm:mt-2"
                  style={{ fontFamily: "OverpassMono, monospace", color: COLORS.red }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h2
                  className="text-lg sm:text-xl md:text-2xl font-bold leading-snug"
                  style={{ fontFamily: "Gilroy, sans-serif", color: COLORS.white }}
                >
                  {section.title}
                </h2>
              </div>

              {/* Content paragraphs */}
              <div className="pl-8 sm:pl-14">
                {section.content.map((para, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-sm sm:text-[15px] leading-[1.85] mb-4 last:mb-0"
                    style={{ fontFamily: "Gilroy-Regular, sans-serif", color: COLORS.grey }}
                  >
                    {para}
                  </p>
                ))}

                {/* Subsections (e.g. Consent withdrawal) */}
                {section.subsections?.map((sub, sIdx) => (
                  <div key={sIdx} className="mt-5">
                    <h3
                      className="text-sm sm:text-base font-semibold mb-2"
                      style={{ fontFamily: "Gilroy, sans-serif", color: COLORS.white }}
                    >
                      {sub.subtitle}
                    </h3>
                    <p
                      className="text-sm sm:text-[15px] leading-[1.85]"
                      style={{ fontFamily: "Gilroy-Regular, sans-serif", color: COLORS.grey }}
                    >
                      {sub.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* ── Contact section ── */}
          <div
            className="py-8 sm:py-10 border-t"
            style={{ borderColor: `${COLORS.greyFaint}50` }}
          >
            <div className="flex items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
              <span
                className="text-[10px] tracking-[0.3em] shrink-0 mt-1.5 sm:mt-2"
                style={{ fontFamily: "OverpassMono, monospace", color: COLORS.red }}
              >
                {String(sections.length + 1).padStart(2, "0")}
              </span>
              <h2
                className="text-lg sm:text-xl md:text-2xl font-bold leading-snug"
                style={{ fontFamily: "Gilroy, sans-serif", color: COLORS.white }}
              >
                Questions & Contact
              </h2>
            </div>

            <div className="pl-8 sm:pl-14">
              <p
                className="text-sm sm:text-[15px] leading-[1.85] mb-4"
                style={{ fontFamily: "Gilroy-Regular, sans-serif", color: COLORS.grey }}
              >
                For access, corrections, complaints, or more information, contact
                our Privacy Compliance Officer at{" "}
                <a
                  href="mailto:tedx@nerist.ac.in"
                  className="transition-colors duration-300 hover:opacity-80"
                  style={{ color: COLORS.red, textDecoration: "none", borderBottom: `1px solid ${COLORS.red}40` }}
                >
                  tedx@nerist.ac.in
                </a>
              </p>
              <p
                className="text-sm sm:text-[15px] leading-[1.85]"
                style={{ fontFamily: "Gilroy-Regular, sans-serif", color: COLORS.greyDim }}
              >
                NERIST, Nirjuli, Itanagar, Arunachal Pradesh — 791109
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
