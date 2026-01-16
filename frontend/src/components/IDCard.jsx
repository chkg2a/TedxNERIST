import "../css/IDCard.css"

const IDCard = ({firstName, lastName, role, className, invert}) => {
  return (
    <div className={`id-card-container shadow-2xl ${className} ${invert ? "bg-white text-black" : "bg-black text-white"}`}>
      {/* Background Blobs */}
      <div className="blob blob-top-right"></div>
      <div className="blob blob-bottom-left"></div>
      <div className="blob blob-bottom-right"></div>

      {/* Content */}
      <img className="w-32 relative z-10" src="/logo_wl.webp" alt="logo" />
      <img className="id-card-x relative z-10" src="/images/bigX.png" alt="X background" />
      
      <div className="id-card-bottom relative z-10">
          <p className="text-2xl">{firstName}</p>
          <p className="text-2xl -mt-4">{lastName}</p>
        <div className={`w-40 h-[1px] ${invert ? "bg-black" : "bg-white"}`} />
        <p className="text-lg">{role}</p>
      </div>

      {/* Gradient Blur Overlay (Sits on top of everything) */}
      <div className="blur-overlay"></div>
    </div>
  )
}

export default IDCard
