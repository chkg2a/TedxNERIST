import "../css/Hero.css";
import IDCard from "./IDCard";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex items-center justify-center card-stack -translate-y-10">
        <IDCard firstName="Renne" lastName="Bright" role="SPEAKER" className="translate-y-22 z-20" />
        <IDCard firstName="Chingkhei" lastName="Haobam" role="DEVELOPER" className="translate-y-11 -translate-x-8 z-10" invert={true} />
        <IDCard firstName="Kurumi" lastName="Tokisaki" role="PRESENTER" className="-translate-x-16" />
      </div>

      {/* Register Button */}
      <button
        onClick={() => navigate("/register")}
        className="mt-8 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-600/30"
      >
        Register Now
      </button>
    </div>
  );
}

export default Hero;
