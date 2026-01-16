import "../css/Ticket2.css";
import { useNavigate } from "react-router-dom";

const TicketSection = () => {
  const navigate = useNavigate();

  const redirectToStudent = () => {
    navigate("/ticket"); // Replace "/student" with your desired route
  };

  return (
    <div className="ticket-section">
      <div className="ticket-container">
        <div className="ticket">
          <img className="ticket-image" src="/images/Ticket.png" alt="Ticket" />
        </div>
      </div>
      <div className="book-button-container">
        <button className="book-button" onClick={redirectToStudent}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default TicketSection;
