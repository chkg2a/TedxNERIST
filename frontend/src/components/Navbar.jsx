import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import "../css/Navbar.css";
import { NAV_LINKS, CTA_BUTTON } from "../constants/Navbar";

const NavLink = ({ link, onClick, isActive }) => {
  const baseClass =
    "text-[13px] tracking-[0.06em] uppercase transition-colors duration-300";
  const colorClass = isActive ? "text-white" : "text-gray-400 hover:text-white";
  const className = `${baseClass} ${colorClass}`;

  if (link.type === "router") {
    return (
      <Link to={link.path} className={className} onClick={onClick}>
        {link.label}
      </Link>
    );
  }

  return (
    <a href={link.path} className={className} onClick={onClick}>
      {link.label}
    </a>
  );
};

const Navbar = ({ isReady = true }) => {
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hasCTA = CTA_BUTTON && CTA_BUTTON.label && location.pathname !== CTA_BUTTON.path;

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: isReady ? "auto" : "none" }}
    >
    <header
      className={`header ${scrolled ? "header--scrolled" : ""} ${expanded ? "header--expanded" : ""}`}
    >
      <div className="px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-[72px]">

          {/* Logo */}
          <Link to="/" className="shrink-0 flex items-center">
            <img
              className="h-[38px] sm:h-[42px] w-auto"
              src="/logo_wl.webp"
              alt="TEDxNERIST"
            />
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            className="flex md:hidden text-white/80 hover:text-white transition-colors p-1"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-label="Toggle menu"
          >
            {expanded ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12" style={{ fontFamily: "Gilroy-Medium, sans-serif" }}>
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.id}
                link={link}
                isActive={location.pathname === link.path}
              />
            ))}
          </nav>

          {/* Desktop CTA */}
          {hasCTA && (
            <div className="hidden md:flex items-center">
              <Link
                to={CTA_BUTTON.path}
                className="nav-cta"
                style={{ fontFamily: "Gilroy-Medium, sans-serif" }}
              >
                {CTA_BUTTON.label}
                {CTA_BUTTON.showArrow && <span className="nav-cta__arrow">→</span>}
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {expanded && (
          <nav className="md:hidden pb-6 pt-2 space-y-5 border-t border-white/[0.06]" style={{ fontFamily: "Gilroy-Medium, sans-serif" }}>
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.id}
                link={link}
                isActive={location.pathname === link.path}
                onClick={() => setExpanded(false)}
              />
            ))}
            {hasCTA && (
              <Link
                to={CTA_BUTTON.path}
                className="nav-cta nav-cta--block"
                onClick={() => setExpanded(false)}
              >
                {CTA_BUTTON.label}
                {CTA_BUTTON.showArrow && <span className="nav-cta__arrow">→</span>}
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
    </motion.div>
  );
};

export default Navbar;
