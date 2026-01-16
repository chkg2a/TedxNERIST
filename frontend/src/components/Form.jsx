import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StudentForm = () => {
  const [regNo, setRegNo] = useState("");
  const [student, setStudent] = useState(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (formSubmitted) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            navigate("/");
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [formSubmitted, navigate]);

  const handleRegChange = async (e) => {
    const input = e.target.value;
    setRegNo(input);
    setStudent(null);
    setError("");

    if (input.length > 4) {
      try {
        const formattedRegNo = input.trim();
        const res = await fetch(
          `https://te-dx-form-backend.vercel.app/api/student/${formattedRegNo}`
        );

        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setStudent(data);
        } else {
          setStudent(null);
          setError("Student not found.");
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
        setError("Failed to fetch student data.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!student) {
      setError("No student selected.");
      return;
    }

    const studentData = {
      registrationNumber: regNo,
      name: student.name || "",
      rollNumber: student.roll_number || "",
      email,
    };

    try {
      const response = await fetch(
        "https://te-dx-form-backend.vercel.app/api/student",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(studentData),
        }
      );

      if (response.ok) {
        console.log("Student data saved successfully");
        setSuccessMessage("Student data submitted successfully!");
        setError("");
        setFormSubmitted(true);
      } else {
        setError("Failed to save student data.");
      }
    } catch (error) {
      console.error("Error saving student data:", error);
      setError("Failed to save student data.");
    }
  };

  if (formSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#161616] text-white text-center px-5 font-gilroy">
        <h2 className="text-xl font-semibold">
          Student data submitted successfully! Redirecting to homepage in{" "}
          {countdown} seconds...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#161616] px-5 font-gilroy">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-lg border border-white/30 w-full max-w-md"
      >
        <h2 className="text-white text-center text-xl font-semibold">
          Student Form
        </h2>
        <input
          type="text"
          value={regNo}
          onChange={handleRegChange}
          placeholder="Enter Registration Number (e.g., 121016)"
          className="border p-2 w-full rounded bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500"
        />

        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        {successMessage && (
          <p className="text-green-400 text-sm mt-2">{successMessage}</p>
        )}

        {student && (
          <>
            <input
              type="text"
              value={student.name}
              readOnly
              className="border p-2 w-full mt-2 rounded bg-white/20 text-white cursor-not-allowed"
            />
            <input
              type="text"
              value={student.roll_number}
              readOnly
              className="border p-2 w-full mt-2 rounded bg-white/20 text-white cursor-not-allowed"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              className="border p-2 w-full mt-2 rounded bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </>
        )}

        <button
          type="submit"
          className="bg-[#EB0028] text-white p-3 mt-4 w-full rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          🚀 Submit
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
