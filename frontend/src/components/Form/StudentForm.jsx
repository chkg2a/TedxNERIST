import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ArrowRight } from "lucide-react";

export default function SeatReservationForm() {
  const [selectedOption, setSelectedOption] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRedirect = () => {
    if (selectedOption === "student") {
      navigate("/ticket/student");
    } else if (selectedOption === "outsider") {
      window.location.href = "/404";
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4 sm:p-6 md:p-0">
      <div
        className="bg-gray-100 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row w-full sm:max-w-[90%] md:w-[600px] lg:w-[800px] shadow-lg"
        style={{ fontFamily: "Gilroy-Medium" }}
      >
        {/* Left Section - Form */}
        <div className="w-full md:w-1/2 pr-0 md:pr-6 flex flex-col justify-between">
          {/* Top Section - Title */}
          <h2
            className="text-3xl md:text-5xl text-black text-center font-semibold mb-6 md:mb-8 mt-4 md:mt-6"
            style={{ fontFamily: "Cirka" }}
          >
            Reserve your seat
          </h2>

          {/* Middle Section - Please Select */}
          <div className="flex flex-col items-start mb-12 md:mb-24">
            <label className="text-base text-black mb-2">Please Select</label>
            <div className="relative mb-4 w-full max-w-xs">
              <button
                className="w-full p-3 md:p-4 text-lg rounded-lg bg-gray-300 border ring-black border-gray-500 flex items-center justify-between ring-2 outline-none"
                onClick={toggleDropdown}
              >
                <span className="text-black">
                  {selectedOption
                    ? selectedOption.charAt(0).toUpperCase() +
                      selectedOption.slice(1)
                    : "Select an option"}
                </span>
                <ChevronDown
                  className="text-black transition-transform duration-300"
                  style={{
                    transform: isDropdownOpen
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  }}
                />
              </button>

              {/* Dropdown Options */}
              <div
                ref={dropdownRef}
                className={`absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10 
                transition-all duration-300 transform origin-top ${
                  isDropdownOpen
                    ? "scale-y-100 opacity-100"
                    : "scale-y-0 opacity-0"
                }
                `}
                style={{ transformOrigin: "top" }}
              >
                <div
                  className="w-full p-4 text-l text-black text-center cursor-pointer hover:bg-black hover:text-white rounded-lg transition-all duration-200"
                  onClick={() => {
                    setSelectedOption("student");
                    setIsDropdownOpen(false);
                  }}
                >
                  NERIST Student
                </div>
                <div
                  className="w-full p-4 text-l text-black text-center cursor-pointer hover:bg-black hover:text-white rounded-lg transition-all duration-200"
                  onClick={() => {
                    setSelectedOption("outsider");
                    setIsDropdownOpen(false);
                  }}
                >
                  Outsider
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Arrow Button */}
          <div className="mb-5 flex justify-center">
            <button
              onClick={handleRedirect}
              disabled={!selectedOption}
              className={`bg-black! text-white rounded-full p-4 md:p-5 cursor-pointer transition-transform duration-200 ${
                selectedOption
                  ? "hover:scale-110"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="w-full md:w-1/2 mt-6 md:mt-0 hidden md:block">
          <img
            src="/images/Form.png"
            alt="Lighthouse Illustration"
            className="rounded-xl object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
