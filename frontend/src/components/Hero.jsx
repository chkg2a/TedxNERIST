import "../css/Hero.css";
import IDCard from "./IDCard";

function Hero() {

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center justify-center card-stack -translate-y-10">
        <IDCard firstName="Renne" lastName="Bright" role="SPEAKER" className="translate-y-22 z-20"/>
        <IDCard firstName="Chingkhei" lastName="Haobam" role="DEVELOPER" className="translate-y-11 -translate-x-8 z-10" invert={true}/>
        <IDCard firstName="Kurumi" lastName="Tokisaki" role="PRESENTER" className="-translate-x-16"/>
      </div>
    </div>
  );
}

export default Hero;
