import React, { useRef, useEffect } from "react";

import { toPng } from "html-to-image";

const Ticket = () => {
  const elementRef = useRef(null);

  useEffect(() => {
    document.body.classList.add("ticket-page"); // Add class to body
    return () => {
      document.body.classList.remove("ticket-page"); // Remove when unmounting
    };
  }, []);

  const htmlToImageConvert = () => {
    toPng(elementRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="ticket-container" ref={elementRef} className="ticket-container">
      <div className="ticket">
        <img
          className="ticket-image"
          src="/images/ticketdown.png"
          alt="Ticket"
          crossOrigin="anonymous"
        />
        <img
          className="qrcode"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/592px-QR_code_for_mobile_English_Wikipedia.svg.png"
          alt="QR Code"
          crossOrigin="anonymous"
        />
        <p className="ticket-id">TXN-25-###</p>
      </div>
      <button className="download-btn" onClick={htmlToImageConvert}>
        Download Ticket
      </button>
    </div>
  );
};

export default Ticket;
