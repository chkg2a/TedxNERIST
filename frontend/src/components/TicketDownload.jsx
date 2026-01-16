import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import QRious from "qrious";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import url from "../constants/config";
import toast, { Toaster } from "react-hot-toast";

const TicketDownload = () => {
  const { id } = useParams();
  const [ticketData, setTicketData] = useState(null);
  const [error, setError] = useState(null);
  const qrCanvasRef = useRef(null);
  const ticketRef = useRef(null);

  useEffect(() => {
    fetch(`${url}/api/ticket/get/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ticket not found");
        }
        return response.json();
      })
      .then((data) => {
        setTicketData(data);
        toast.success("Ticket loaded successfully!");
      })
      .catch((error) => {
        setError(error.message);
        toast.error(error.message);
      });
  }, [id]);

  useEffect(() => {
    if (ticketData && qrCanvasRef.current) {
      new QRious({
        element: qrCanvasRef.current,
        value: id,
        size: 140,
      });
    }
  }, [ticketData, id]);

  const downloadPDF = () => {
    html2canvas(ticketRef.current, { scale: 3 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", [100, 150]);
      pdf.addImage(imgData, "PNG", 5, 5, 90, 140);
      pdf.save("TEDxNERIST_Ticket.pdf");
      toast.success("PDF downloaded successfully!");
    });
  };

  const addToGoogleCalendar = () => {
    if (!ticketData) return;

    const eventName = "TEDxNERIST - Lighthouse Apus";
    const eventLocation =
      "NERIST Auditorium, NERIST, Nirjuli, Arunachal Pradesh";
    const mapsLink = "https://shorturl.at/CsZzQ";
    const eventStart = "20250412T043000Z";
    const eventEnd = "20250412T113000Z";
    const eventDetails = `Hey ${ticketData.name},\n\nYour TEDxNERIST ticket is confirmed!\n\n📍 Event: ${eventName}\n🏢 Location: ${eventLocation}\n📍 Directions: ${mapsLink}\n🎟️ Ticket No: #${ticketData.ticketNumber}\n📅 Date & Time: April 10, 2025 | 10:00 AM - 5:00 PM\n\nMake sure to bring this ticket or scan the QR code for entry. See you there!\n\n🔗 Ticket URL: https://tedxnerist.com/ticket/${id}`;

    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      eventName
    )}&details=${encodeURIComponent(
      eventDetails
    )}&location=${encodeURIComponent(
      eventLocation
    )}&dates=${eventStart}/${eventEnd}&sf=true&output=xml`;
    window.open(googleCalendarUrl, "_blank");
    toast.success("Added to Google Calendar!");
  };

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500 font-bold">❌ {error}</div>
    );
  }

  if (!ticketData) {
    return (
      <div className="text-white text-center mt-10">
        Loading ticket details...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <Toaster />
      <div
        ref={ticketRef}
        className="w-96 bg-black p-5 border-2 border-dashed border-red-500 rounded-lg shadow-lg relative text-center"
      >
        <img
          src="/logo.svg"
          alt="TEDxNERIST Logo"
          className="w-24 mx-auto mb-2"
        />
        <h1 className="text-red-500 text-2xl font-bold">TEDxNERIST</h1>
        <h3 className="text-lg mt-2">Lighthouse Apus</h3>
        <p className="mt-2 text-sm">
          <strong>Name:</strong> {ticketData.name}
        </p>
        <p className="text-sm">
          <strong>Ticket No:</strong> #{ticketData.ticketNumber}
        </p>
        <canvas ref={qrCanvasRef} className="mt-3 mx-auto block" />
        <p className="text-xs text-red-400 mt-3 font-bold">
          Scan QR Code for Entry
        </p>
      </div>
      <button
        onClick={downloadPDF}
        className="mt-5 px-5 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition-all"
      >
        Download Ticket
      </button>
      <button
        onClick={addToGoogleCalendar}
        className="mt-5 px-5 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition-all"
      >
        Add To Calendar
      </button>
    </div>
  );
};

export default TicketDownload;
