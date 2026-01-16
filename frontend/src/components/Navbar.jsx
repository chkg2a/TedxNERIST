import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
// Import the data
import { NAV_LINKS, CTA_BUTTON } from "../constants/Navbar";

// Helper component to render specific link types
const NavLink = ({ link, onClick }) => {
  const className = "block text-base font-normal text-gray-400 transition-all duration-200 hover:text-white";

  if (link.type === "router") {
    return (
      <Link to={link.path} className={className} onClick={onClick}>
        {link.label}
      </Link>
    );
  }

  // Default to anchor tag
  return (
    <a href={link.path} className={className} onClick={onClick}>
      {link.label}
    </a>
  );
};

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);

  // Consider using window.innerWidth for better accuracy than screen.width
  const isPhone = () => typeof window !== "undefined" && window.innerWidth <= 800;

  return (
    <header
      className={`py-4 sm:py-6 ${isPhone() ? "-" : ""} header ${expanded ? "bg-black!" : ""
        }`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div className="shrink-0">
            <a href="/" title="" className="flex">
              <img className="w-auto logo" src="/logo_wl.webp" alt="Logo" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-white"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
            >
              {expanded ? (
                <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden space-x-10 md:flex md:items-center md:justify-center lg:space-x-16">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.id} link={link} />
            ))}
          </nav>

          {/* DESKTOP CTA BUTTON */}
          {CTA_BUTTON.length !== 0 && (
            <div className="hidden md:inline-flex items-center">
              <Link to={CTA_BUTTON.path} className="custom-button">
                <span className="text">{CTA_BUTTON.label}</span>
                {CTA_BUTTON.showArrow && (
                  <span className="ml-2">→</span> // Or use your <img /> tag here
                )}
              </Link>
            </div>
          )}
        </div>

        {/* MOBILE NAV MENU */}
        {expanded && (
          <nav className="pt-8 pb-4 space-y-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.id}
                link={link}
                onClick={() => setExpanded(false)} // Close menu on click
              />
            ))}

            <div className="relative inline-flex items-center justify-center group">
              <Link
                to={CTA_BUTTON.path}
                className="custom-button"
                onClick={() => setExpanded(false)}
              >
                <span className="text">{CTA_BUTTON.label}</span>
                {CTA_BUTTON.showArrow && (
                  <span className="ml-2">→</span> // Or use your <img /> tag here
                )}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
