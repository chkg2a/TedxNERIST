import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Import the image
import formImage from "/images/Form.png"; // Adjust the path as needed

export default function OutSiderForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    confirmEmail: false,
    agreeToPolicy: false,
  });
  const [formError, setFormError] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone number must be exactly 10 digits";
    if (!formData.confirmEmail)
      newErrors.confirmEmail = "Please confirm your email address";
    if (!formData.agreeToPolicy)
      newErrors.agreeToPolicy = "You must agree to the Privacy Policy";

    setFormError(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitLoading(true);
    setSubmitMessage("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form Data Submitted:", formData);
      setSubmitMessage("Ticket purchase successful!");
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitMessage("Failed to purchase ticket. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl p-8 flex flex-col md:flex-row w-full sm:max-w-[90%] md:w-[750px] lg:w-[900px] shadow-xl"
      >
        <div className="w-full md:w-1/2 pr-0 md:pr-6 flex flex-col justify-center">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-4xl text-gray-800 font-bold mb-4"
          >
            Buy Your Ticket 🎟️
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-gray-600 mb-6"
          >
            Secure your spot at TEDx NERIST now!
          </motion.p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Name Input */}
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
              />
              {formError.name && <p className="error-text">{formError.name}</p>}
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
              />
              {formError.email && (
                <p className="error-text">{formError.email}</p>
              )}
            </div>

            {/* Phone Input */}
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input-field"
              />
              {formError.phone && (
                <p className="error-text">{formError.phone}</p>
              )}
            </div>

            {/* Checkboxes */}
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  name="confirmEmail"
                  checked={formData.confirmEmail}
                  onChange={handleChange}
                  className="checkbox"
                />
                I confirm the email address is correct
              </label>

              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  name="agreeToPolicy"
                  checked={formData.agreeToPolicy}
                  onChange={handleChange}
                  className="checkbox"
                />
                I agree to the{" "}
                <span className="font-semibold">Privacy Policy</span>
              </label>
            </div>

            {/* Submit Button */}
            <motion.div className="flex justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={submitLoading}
                className="submit-btn"
              >
                {submitLoading ? "Purchasing..." : "Buy Ticket"}
              </motion.button>
            </motion.div>

            {submitMessage && (
              <p
                className={`text-sm ${
                  submitMessage.includes("successful")
                    ? "text-green-500"
                    : "text-red-500"
                } mt-3`}
              >
                {submitMessage}
              </p>
            )}
          </form>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 mt-6 md:mt-0 flex items-center justify-center">
          <img
            src={formImage}
            alt="Buy Ticket Illustration"
            className="rounded-lg object-cover w-full max-h-[400px] shadow-md"
          />
        </div>
      </motion.div>
    </div>
  );
}
