import React, { useState } from "react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [expanded, setExpanded] = useState(false);

  function isPhone() {
    return screen.width <= 800;
  }
  return (
    <>
      {/* Navbar */}
      <header
        className={`py-4 sm:py-6 ${isPhone() ? "-" : ""} header ${
          expanded ? "bg-black!" : ""
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
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
                  <svg
                    className="w-7 h-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-7 h-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>

            <nav className="hidden space-x-10 md:flex md:items-center md:justify-center lg:space-x-16">
              {["Home", "About"].map((label) => (
                <a
                  key={label}
                  href={`/#${label.toLowerCase()}`}
                  className="block text-base font-normal text-gray-400 transition-all duration-200 hover:text-white "
                >
                  {label}
                </a>
              ))}
              <Link
                to="/team"
                className="block text-base font-normal text-gray-400 transition-all duration-200 hover:text-white "
              >
                Team
              </Link>
              <Link
                to="/contact"
                className="block text-base font-normal text-gray-400 transition-all duration-200 hover:text-white "
              >
                Contact
              </Link>
            </nav>

            <div className="hidden md:inline-flex items-center">
              <Link to="/ticket" className="custom-button">
                <span className="text">Book Now →</span>
                <img src={"/arrow.svg"} alt="Arrow" className="arrow-icon" />
              </Link>

              {/* <button className="custom-button" onClick={tempButtonClick}>
                <span className="text">Book Now</span>
                <img src={"/arrow.svg"} alt="Arrow" className="arrow-icon" />
              </button> */}
            </div>
          </div>

          {expanded && (
            <nav className="pt-8 pb-4 space-y-8">
              {["Home", "About"].map((label) => (
                <a
                  key={label}
                  href={`/#${label.toLowerCase()}`}
                  className="block text-base font-normal text-gray-400 transition-all duration-200 hover:text-white "
                >
                  {label}
                </a>
              ))}
              <Link
                to="/team"
                className="block text-base font-normal text-gray-400 transition-all duration-200 hover:text-white "
              >
                Team
              </Link>
              <Link
                to="/contact"
                className="block text-base font-normal text-gray-400 transition-all duration-200 hover:text-white "
              >
                Contact
              </Link>

              <div className="relative inline-flex items-center justify-center group">
                <Link to="/ticket" className="custom-button">
                  <span className="text">Book Now</span>
                  <img src={"/arrow.svg"} alt="Arrow" className="arrow-icon" />
                </Link>

                {/* <button className="custom-button" onClick={tempButtonClick}>
                  <span className="text">Book Now</span>
                  <img src={"/arrow.svg"} alt="Arrow" className="arrow-icon" />
                </button> */}
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
