import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/* ═══════════════════════════════════════════════════════════════
   FOOTER — Cinematic editorial
   Four-column grid: Brand | Location meta | Programs | Community
   Crimson accent divider line, monospace metadata, text-link socials
═══════════════════════════════════════════════════════════════ */

const COLORS = {
  bg: "#050505",
  bgAlt: "#080808",
  red: "#eb0028",
  white: "#f0f0f0",
  grey: "#555",
  greyDim: "#2a2a2a",
  greyFaint: "#131313",
};

const Mono = ({ children, className = "", style = {} }) => (
  <span
    className={className}
    style={{ fontFamily: "OverpassMono, monospace", ...style }}
  >
    {children}
  </span>
);

const FooterLink = ({ href, to, children, external = false }) => {
  const cls =
    "flex items-center gap-1.5 text-[#555] hover:text-[#f0f0f0] transition-colors duration-300 group";
  const inner = (
    <>
      <span
        className="text-[#eb0028] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ fontFamily: "OverpassMono, monospace" }}
      >
        →
      </span>
      {children}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={cls}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {inner}
    </a>
  );
};

const SocialLink = ({ href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center gap-2 text-[#555] hover:text-[#f0f0f0] transition-colors duration-300"
    style={{ fontFamily: "OverpassMono, monospace", fontSize: "11px", letterSpacing: "0.1em" }}
  >
    <span
      className="inline-block w-4 h-[1px] bg-[#333] group-hover:bg-[#eb0028] group-hover:w-6 transition-all duration-300"
    />
    {label.toUpperCase()}
  </a>
);

function Footer() {
  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{ background: COLORS.bg }}
    >
      {/* Grid texture background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 47px, rgba(255,255,255,0.4) 47px, rgba(255,255,255,0.4) 48px), repeating-linear-gradient(90deg, transparent, transparent 47px, rgba(255,255,255,0.4) 47px, rgba(255,255,255,0.4) 48px)",
        }}
      />

      {/* Top crimson rule */}
      <div
        className="w-full h-[1px]"
        style={{
          background: `linear-gradient(to right, transparent, ${COLORS.red}, transparent)`,
          opacity: 0.6,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-10">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-14 border-b border-white/[0.05]">

          {/* ── Col 1: Brand ── */}
          <div className="lg:col-span-1">
            <motion.img
              src="/logo_wl.webp"
              alt="TEDxNERIST"
              className="h-7 w-auto mb-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
            <p
              className="text-sm leading-[1.8] mb-8"
              style={{ fontFamily: "Gilroy-Regular, sans-serif", color: COLORS.grey }}
            >
              An independently organized TEDx event at NERIST — celebrating
              local voices and ideas worth spreading. Licensed by TED.
            </p>

            {/* Socials as editorial text links */}
            <div className="flex flex-col gap-3">
              <SocialLink href="https://instagram.com/tedxnerist" label="Instagram" />
              <SocialLink href="https://facebook.com/tedxnerist" label="Facebook" />
              <SocialLink href="https://www.linkedin.com/company/tedxnerist/" label="LinkedIn" />
              <SocialLink href="https://twitter.com/tedxnerist" label="Twitter (X)" />
            </div>
          </div>

          {/* ── Col 2: Location meta ── */}
          <div className="lg:col-span-1">
            <Mono
              className="text-[10px] tracking-[0.4em] uppercase block mb-6"
              style={{ color: COLORS.red }}
            >
              Event Details
            </Mono>

            <div className="flex flex-col gap-5">
              {[
                { label: "Venue", value: "NERIST Auditorium" },
                { label: "Location", value: "Nirjuli, Arunachal Pradesh" },
                { label: "Date", value: "March 2026" },
                { label: "Duration", value: "3-Day Experience" },
                { label: "Contact", value: "+91 88220 78464" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <Mono
                    className="text-[9px] tracking-[0.3em] uppercase block mb-1"
                    style={{ color: "#333" }}
                  >
                    {label}
                  </Mono>
                  <span
                    className="text-sm"
                    style={{ fontFamily: "Gilroy-Regular, sans-serif", color: "#888" }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Embedded map — editorial aspect */}
            <div className="mt-8 rounded-sm overflow-hidden opacity-60 hover:opacity-90 transition-opacity duration-500">
              <iframe
                title="TEDx NERIST Location"
                className="w-full"
                style={{ height: "120px" }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3551.0182671765815!2d93.73606939678953!3d27.124234600000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3743ff771f0446b5%3A0x14fa96c700366cf5!2sNERIST%20Auditorium!5e0!3m2!1sen!2sin!4v1742853582482!5m2!1sen!2sin"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          {/* ── Col 3: Programs ── */}
          <div>
            <Mono
              className="text-[10px] tracking-[0.4em] uppercase block mb-6"
              style={{ color: COLORS.red }}
            >
              Programs
            </Mono>
            <ul className="flex flex-col gap-3 text-sm" style={{ fontFamily: "Gilroy-Regular, sans-serif" }}>
              {[
                { label: "TEDx", href: "https://www.ted.com/" },
                { label: "TED Fellows", href: "https://www.ted.com/about/programs-initiatives/ted-fellows" },
                { label: "TED Ed", href: "https://ed.ted.com/" },
                { label: "TED Translators", href: "https://www.ted.com/about/programs-initiatives/ted-translators" },
                { label: "TED Institute", href: "https://www.ted.com/about/programs-initiatives/ted-institute" },
                { label: "TED@Work", href: "https://www.ted.com/about/programs-initiatives/ted-at-work" },
                { label: "TED Courses", href: "https://www.ted.com/about/programs-initiatives/ted-courses" },
                { label: "Audacious Project", href: "https://www.audaciousproject.org/" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <FooterLink href={href} external>{label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Community + Legal ── */}
          <div>
            <Mono
              className="text-[10px] tracking-[0.4em] uppercase block mb-6"
              style={{ color: COLORS.red }}
            >
              Community
            </Mono>
            <ul className="flex flex-col gap-3 text-sm mb-10" style={{ fontFamily: "Gilroy-Regular, sans-serif" }}>
              {[
                { label: "TED Speakers", href: "https://www.ted.com/speakers" },
                { label: "TED Organizers", href: "https://www.ted.com/participate/organize-a-local-tedx-event" },
                { label: "TED Community", href: "https://community.ted.com/" },
                { label: "TED Translators", href: "https://www.ted.com/about/programs-initiatives/ted-translators" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <FooterLink href={href} external>{label}</FooterLink>
                </li>
              ))}
            </ul>

            <Mono
              className="text-[10px] tracking-[0.4em] uppercase block mb-4"
              style={{ color: "#333" }}
            >
              Legal
            </Mono>
            <ul className="flex flex-col gap-3 text-sm" style={{ fontFamily: "Gilroy-Regular, sans-serif" }}>
              {[
                { label: "Privacy Policy", to: "/policy" },
                { label: "Refund Policy", to: "/refund" },
                { label: "Terms & Conditions", to: "/term" },
                { label: "Contact", to: "/contact" },
              ].map(({ label, to }) => (
                <li key={label}>
                  <FooterLink to={to}>{label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Mono
            className="text-[10px] tracking-[0.25em] uppercase"
            style={{ color: "#2a2a2a" }}
          >
            © 2026 TEDxNERIST
          </Mono>
          <Mono
            className="text-[10px] tracking-[0.2em] text-center"
            style={{ color: "#2a2a2a" }}
          >
            Independently organized under license from TED
          </Mono>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: COLORS.red }} />
            <Mono
              className="text-[10px] tracking-[0.25em] uppercase"
              style={{ color: "#2a2a2a" }}
            >
              Ideas Worth Spreading
            </Mono>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
