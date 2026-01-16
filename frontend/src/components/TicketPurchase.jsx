import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/TicketPurchase.css";
import url from "../constants/config.js";

const TicketPurchase = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!validateEmail(formData.email))
      newErrors.email = "Invalid email format";
    if (!validatePhone(formData.phone))
      newErrors.phone = "Phone number must be 10 digits";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const orderResponse = await fetch(`${url}/api/razorpay/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "ticket",
          name: formData.name,
          email: formData.email,
          amount: 300,
        }),
      });

      const order = await orderResponse.json();
      setLoading(false);
      if (order && order.id) initiateRazorpay(order.id);
      else alert("⚠️ Order creation failed. Try again.");
    } catch (error) {
      setLoading(false);
      console.error("Order creation failed", error);
      alert("Something went wrong! Please try again.");
    }
  };

  const initiateRazorpay = (orderId) => {
    const options = {
      key: "rzp_test_e8nmkRiQJIqDJo",
      amount: 30000,
      currency: "INR",
      name: "ticket",
      description: "Ticket Purchase",
      image: "/logo.svg",
      order_id: orderId,
      handler: async (response) => {
        try {
          const verifyResponse = await fetch(
            `${url}/api/razorpay/verify-payment`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                order: orderId,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                type: "ticket",
                amount: 300,
              }),
            }
          );

          const verification = await verifyResponse.json();
          if (verification.status === 200) {
            window.location.href = `/ticket/${verification.ticket}`;
          } else {
            alert("❌ Payment verification failed!");
          }
        } catch (error) {
          console.error("Verification failed", error);
          alert("Something went wrong! Please contact support.");
        }
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      theme: { color: "#FFFFFF" },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <>
      <div className="container">
        <h2>Secure Your Spot Now!</h2>
        <p>Limited seats available. Get your ticket today.</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div>
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="1234567890"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Buy Ticket"}
          </button>
        </form>
      </div>
    </>
  );
};

export default TicketPurchase;
