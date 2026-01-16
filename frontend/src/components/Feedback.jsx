import { useState, useEffect } from "react";
import { Star, Check, Loader2, AlertTriangle } from "lucide-react"; // Added AlertTriangle for errors

// Assuming speakers is imported (using placeholder)
const speakers = [
  {
    id: "1",
    name: "Jane Smith",
    description: "AI Ethics",
    topics: ["Ethics in AI", "Responsible AI Development"],
  },
  {
    id: "2",
    name: "John Doe",
    description: "Blockchain Technology",
    topics: ["Web3", "Smart Contracts"],
  },
  {
    id: "3",
    name: "Sarah Johnson",
    description: "UX Design",
    topics: ["User Research", "Design Systems"],
  },
];

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    ratings: {},
    feedback: "",
    attendedSessions: [],
    wouldRecommend: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState(1);
  const totalSections = 3;

  useEffect(() => {
    const savedData = localStorage.getItem("feedbackFormData");
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (error) {
        console.error("Error parsing saved form data:", error);
        localStorage.removeItem("feedbackFormData"); // Clear corrupted data
      }
    }
  }, []);

  useEffect(() => {
    if (
      !submitted &&
      Object.keys(formData).some((key) => {
        const val = formData[key];
        if (Array.isArray(val)) return val.length > 0;
        if (typeof val === "object" && val !== null)
          return Object.keys(val).length > 0;
        return val !== "" && val !== null;
      })
    ) {
      localStorage.setItem("feedbackFormData", JSON.stringify(formData));
    }
  }, [formData, submitted]);

  // --- Validation Functions (simplified for brevity, retain original logic) ---
  const validateSection = (section) => {
    const newErrors = {};
    // (Keep original validation logic from previous step)
    if (section === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Please enter a valid email";
      if (formData.attendedSessions.length === 0)
        newErrors.attendedSessions = "Please select sessions attended";
    }
    if (section === 2) {
      const attendedSpeakerIds = formData.attendedSessions;
      const hasRatedAll = attendedSpeakerIds.every(
        (id) => formData.ratings[id]
      );
      if (!hasRatedAll && attendedSpeakerIds.length > 0)
        newErrors.ratings = "Please rate all attended speakers";
      if (formData.wouldRecommend === null)
        newErrors.wouldRecommend = "Recommendation choice is required";
    }
    if (section === 3) {
      if (!formData.feedback.trim())
        newErrors.feedback = "Feedback is required";
      else if (formData.feedback.trim().length < 10)
        newErrors.feedback = "Feedback must be at least 10 characters";
    }
    setErrors((prev) => ({ ...prev, ...newErrors })); // Only update errors for current section validation check
    return Object.keys(newErrors).length === 0;
  };

  const validateForm = () => {
    let allErrors = {};
    // (Keep original validation logic from previous step, consolidating all checks)
    if (!formData.name.trim()) allErrors.name = "Name is required";
    if (!formData.email.trim()) allErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      allErrors.email = "Please enter a valid email";
    if (formData.attendedSessions.length === 0)
      allErrors.attendedSessions = "Please select sessions attended";
    const attendedSpeakerIds = formData.attendedSessions;
    const hasRatedAll = attendedSpeakerIds.every((id) => formData.ratings[id]);
    if (!hasRatedAll && attendedSpeakerIds.length > 0)
      allErrors.ratings = "Please rate all attended speakers";
    if (formData.wouldRecommend === null)
      allErrors.wouldRecommend = "Recommendation choice is required";
    if (!formData.feedback.trim()) allErrors.feedback = "Feedback is required";
    else if (formData.feedback.trim().length < 10)
      allErrors.feedback = "Feedback must be at least 10 characters";

    setErrors(allErrors);
    // Highlight first invalid field's section if errors found
    if (Object.keys(allErrors).length > 0) {
      if (allErrors.name || allErrors.email || allErrors.attendedSessions)
        setActiveSection(1);
      else if (allErrors.ratings || allErrors.wouldRecommend)
        setActiveSection(2);
      else if (allErrors.feedback) setActiveSection(3);
    }
    return Object.keys(allErrors).length === 0;
  };
  // --- End Validation ---

  const handleRatingChange = (speakerId, stars) => {
    setFormData((prev) => ({
      ...prev,
      ratings: { ...prev.ratings, [speakerId]: stars },
    }));
    setErrors((prev) => {
      const { ratings, ...rest } = prev;
      return rest;
    }); // Clear rating error
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const updatedSessions = checked
        ? [...formData.attendedSessions, name]
        : formData.attendedSessions.filter((id) => id !== name);
      setFormData((prev) => ({ ...prev, attendedSessions: updatedSessions }));
      setErrors((prev) => {
        const { attendedSessions, ...rest } = prev;
        return rest;
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => {
          const { [name]: _, ...rest } = prev;
          return rest;
        });
      }
    }
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value === "yes" }));
    setErrors((prev) => {
      const { wouldRecommend, ...rest } = prev;
      return rest;
    });
  };

  const moveToNextSection = () => {
    if (validateSection(activeSection) && activeSection < totalSections) {
      setActiveSection((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const moveToPreviousSection = () => {
    if (activeSection > 1) {
      setActiveSection((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const structuredFeedback = {
        /* ... (keep structure) ... */
      };
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Feedback submitted:", structuredFeedback);
      setSubmitted(true);
      localStorage.removeItem("feedbackFormData");
      // Reset logic moved to after timeout
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setErrors({ form: "Submission failed. Please try again." }); // Add a general form error
    } finally {
      setIsSubmitting(false);
      // Reset form state after success message is displayed
      if (submitted) {
        // Check if submission was actually successful before scheduling reset
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            ratings: {},
            feedback: "",
            attendedSessions: [],
            wouldRecommend: null,
          });
          setSubmitted(false);
          setActiveSection(1);
          setErrors({});
        }, 4000); // Slightly shorter timeout
      }
    }
  };

  // --- Sub Components ---

  const StarRating = ({ speakerId }) => {
    const [hoverRating, setHoverRating] = useState(0);
    const currentRating = formData.ratings[speakerId] || 0;

    return (
      <div className="flex items-center space-x-2">
        <div
          className="flex"
          role="group"
          aria-label={`Rating for ${speakerId}`}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-yellow-400 transition-transform duration-100 ease-in-out hover:scale-110"
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => handleRatingChange(speakerId, star)}
              aria-label={`Rate ${star} ${star === 1 ? "star" : "stars"}`}
              aria-pressed={currentRating === star}
            >
              <Star
                size={22} // Slightly smaller
                className={`transition-colors duration-150 ${
                  star <= (hoverRating || currentRating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-600 fill-transparent" // Use fill for contrast
                }`}
                strokeWidth={1.5} // Thinner stroke
              />
            </button>
          ))}
        </div>
        <span className="text-sm font-medium text-gray-400 min-w-[60px] text-right tabular-nums">
          {currentRating > 0 ? `${currentRating}/5` : "Rate"}
        </span>
      </div>
    );
  };

  const ProgressIndicator = () => {
    const steps = ["Your Info", "Ratings", "Feedback"];
    return (
      <div className="mb-8">
        {" "}
        {/* Increased margin bottom */}
        <div className="flex justify-between items-center relative mb-2">
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-700 transform -translate-y-1/2"></div>
          <div
            className="absolute top-1/2 left-0 h-0.5 bg-red-600 transform -translate-y-1/2 transition-all duration-300 ease-out"
            style={{
              width: `${((activeSection - 1) / (totalSections - 1)) * 100}%`,
            }}
          ></div>

          {/* Step Markers */}
          {steps.map((label, index) => {
            const step = index + 1;
            const isCompleted = step < activeSection;
            const isActive = step === activeSection;
            return (
              <div
                key={step}
                className="relative z-10 flex flex-col items-center"
              >
                <button
                  onClick={() => {
                    if (step < activeSection) setActiveSection(step);
                  }}
                  disabled={step >= activeSection} // Disable clicking current/future steps
                  className={`flex items-center justify-center rounded-full h-8 w-8 border-2 transition-colors duration-300 ${
                    isActive
                      ? "bg-red-600 border-red-600 text-white scale-110" // Active step pops
                      : isCompleted
                      ? "bg-gray-800 border-red-600 text-red-500 cursor-pointer hover:bg-gray-700" // Completed step
                      : "bg-gray-800 border-gray-600 text-gray-500" // Future step
                  }`}
                  aria-current={isActive ? "step" : undefined}
                >
                  {isCompleted ? (
                    <Check size={16} strokeWidth={3} />
                  ) : (
                    <span>{step}</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
        {/* Step Labels */}
        <div className="flex justify-between mt-2">
          {steps.map((label, index) => (
            <span
              key={label}
              className={`text-xs w-1/3 text-center px-1 ${
                index + 1 === activeSection
                  ? "text-gray-200 font-medium"
                  : "text-gray-500"
              }`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    );
  };

  // --- Render Logic ---

  if (submitted) {
    return (
      <div className="bg-[#1b1b1b] text-gray-200 min-h-screen py-12 flex items-center justify-center px-4">
        <div className="max-w-md w-full p-8 bg-gray-800 shadow-xl rounded-lg text-center border border-green-600/50 animate-fadeIn">
          <div className="inline-flex items-center justify-center p-3 bg-green-600/20 rounded-full mb-5 border border-green-600">
            <Check className="w-10 h-10 text-green-400" strokeWidth={2} />
          </div>
          <h2 className="text-2xl font-semibold text-green-300 mb-2">
            Thank You!
          </h2>
          <p className="text-gray-300 mb-6">
            Your feedback helps us grow. It's been submitted successfully.
          </p>
          <p className="text-xs text-gray-500">
            This message will close shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1b1b1b] text-gray-200 min-h-screen py-8 sm:py-12 px-4">
      <div className="max-w-3xl mx-auto p-6 sm:p-8 bg-gray-800 shadow-xl rounded-xl border border-gray-700/50">
        {" "}
        {/* Slightly lighter card, subtle border */}
        <h1 className="text-3xl font-bold mb-2 text-red-600 text-center">
          {" "}
          {/* Centered, bolder red */}
          Event Feedback
        </h1>
        <p className="text-gray-400 mb-6 text-center border-b border-gray-700 pb-4">
          {" "}
          {/* Centered, adjusted color/border */}
          Share your experience to help us improve future events.
        </p>
        {errors.form && ( // Display general form error
          <div className="mb-4 p-3 bg-red-900/30 border border-red-600 rounded-md text-red-400 text-sm flex items-center gap-2">
            <AlertTriangle size={18} />
            <span>{errors.form}</span>
          </div>
        )}
        <ProgressIndicator />
        <form onSubmit={handleSubmit} noValidate>
          {" "}
          {/* Added noValidate to rely on JS validation */}
          {/* Section 1: Your Info */}
          {activeSection === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-xl font-semibold text-red-600 border-b border-gray-700 pb-2 mb-5">
                Your Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {" "}
                {/* Grid layout for name/email */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-1.5"
                  >
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`form-input ${
                      errors.name ? "input-error" : "input-base"
                    }`}
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="error-message">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1.5"
                  >
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-input ${
                      errors.email ? "input-error" : "input-base"
                    }`}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="error-message">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <fieldset>
                  <legend className="block text-sm font-medium text-gray-300 mb-2">
                    Sessions Attended <span className="text-red-600">*</span>
                  </legend>
                  {errors.attendedSessions && (
                    <p className="error-message mb-2">
                      {errors.attendedSessions}
                    </p>
                  )}
                  <div className="space-y-3">
                    {speakers.map((speaker) => (
                      <div
                        key={speaker.id}
                        className="flex items-start p-3 bg-gray-700/50 rounded-md border border-gray-600/50 hover:border-gray-500 transition-colors"
                      >
                        <div className="flex items-center h-5 mt-0.5">
                          <input
                            id={`session-${speaker.id}`}
                            name={speaker.id}
                            type="checkbox"
                            checked={formData.attendedSessions.includes(
                              speaker.id
                            )}
                            onChange={handleInputChange}
                            className="form-checkbox"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor={`session-${speaker.id}`}
                            className="font-semibold text-gray-200 cursor-pointer"
                          >
                            {speaker.name}:{" "}
                            <span className="font-normal">
                              {speaker.description}
                            </span>
                          </label>
                          <p className="text-gray-400 text-xs mt-0.5">
                            {speaker.topics.join(" • ")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>
          )}
          {/* Section 2: Ratings */}
          {activeSection === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-xl font-semibold text-red-600 border-b border-gray-700 pb-2 mb-5">
                Ratings & Recommendation
              </h2>
              <div>
                <h3 className="text-md font-medium text-gray-300 mb-3">
                  Speaker Ratings
                </h3>
                {errors.ratings && (
                  <div className="mb-3 p-3 bg-red-900/30 border border-red-600 rounded-md text-red-400 text-sm flex items-center gap-2">
                    <AlertTriangle size={18} />
                    <span>{errors.ratings}</span>
                  </div>
                )}
                <div className="space-y-4">
                  {speakers
                    .filter((speaker) =>
                      formData.attendedSessions.includes(speaker.id)
                    )
                    .map((speaker) => (
                      <div
                        key={speaker.id}
                        className="p-4 border border-gray-700 rounded-lg bg-gray-700/30"
                      >
                        <p className="font-semibold text-gray-200">
                          {speaker.name}
                        </p>
                        <p className="text-sm text-gray-400 mb-2">
                          {speaker.description}
                        </p>
                        <StarRating speakerId={speaker.id} />
                      </div>
                    ))}
                  {formData.attendedSessions.length === 0 && (
                    <p className="text-amber-400 bg-amber-900/30 border border-amber-600 p-3 rounded-lg text-sm">
                      Select attended sessions in the previous step to rate
                      speakers.
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-4">
                {" "}
                {/* Added padding top */}
                <fieldset>
                  <legend className="block text-md font-medium text-gray-300 mb-2">
                    Would you recommend this event?{" "}
                    <span className="text-red-600">*</span>
                  </legend>
                  {errors.wouldRecommend && (
                    <p className="error-message mb-2">
                      {errors.wouldRecommend}
                    </p>
                  )}
                  <div className="flex items-center space-x-6">
                    {" "}
                    {/* Increased spacing */}
                    {["Yes", "No"].map((option) => (
                      <div key={option} className="flex items-center">
                        <input
                          id={`recommend-${option.toLowerCase()}`}
                          name="wouldRecommend"
                          type="radio"
                          value={option.toLowerCase()}
                          checked={
                            formData.wouldRecommend === (option === "Yes")
                          }
                          onChange={handleRadioChange}
                          className="form-radio"
                        />
                        <label
                          htmlFor={`recommend-${option.toLowerCase()}`}
                          className="ml-2 block text-sm text-gray-300 cursor-pointer"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>
          )}
          {/* Section 3: Feedback */}
          {activeSection === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-xl font-semibold text-red-600 border-b border-gray-700 pb-2 mb-5">
                Additional Feedback
              </h2>
              <div>
                <label
                  htmlFor="feedback"
                  className="block text-sm font-medium text-gray-300 mb-1.5"
                >
                  Your Experience <span className="text-red-600">*</span>
                </label>
                <p className="text-xs text-gray-400 mb-2">
                  Share what you enjoyed or suggest improvements (min. 10
                  characters).
                </p>
                <textarea
                  id="feedback"
                  name="feedback"
                  placeholder="Your thoughts here..."
                  value={formData.feedback}
                  onChange={handleInputChange}
                  rows={5}
                  className={`form-textarea ${
                    errors.feedback ? "input-error" : "input-base"
                  }`}
                  aria-required="true"
                  aria-invalid={!!errors.feedback}
                  aria-describedby={
                    errors.feedback ? "feedback-error" : undefined
                  }
                />
                <div className="flex justify-between mt-1">
                  {
                    errors.feedback ? (
                      <p id="feedback-error" className="error-message">
                        {errors.feedback}
                      </p>
                    ) : (
                      <span>&nbsp;</span>
                    ) /* Placeholder for spacing */
                  }
                  <p className="text-xs text-gray-500">
                    {formData.feedback.length} characters
                  </p>
                </div>
              </div>
            </div>
          )}
          {/* Navigation Buttons */}
          <div
            className={`mt-10 pt-6 border-t border-gray-700 flex ${
              activeSection > 1 ? "justify-between" : "justify-end"
            }`}
          >
            {activeSection > 1 && (
              <button
                type="button"
                onClick={moveToPreviousSection}
                className="btn btn-secondary"
              >
                <svg
                  className="w-4 h-4 mr-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  ></path>
                </svg>
                Back
              </button>
            )}

            {activeSection < totalSections ? (
              <button
                type="button"
                onClick={moveToNextSection}
                className="btn btn-primary"
              >
                Continue
                <svg
                  className="w-4 h-4 ml-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
              >
                {isSubmitting ? (
                  <>
                    {" "}
                    <Loader2 size={18} className="animate-spin mr-2" />{" "}
                    Submitting...{" "}
                  </>
                ) : (
                  "Submit Feedback"
                )}
              </button>
            )}
          </div>
          <p className="text-xs text-center text-gray-500 mt-6">
            Fields marked <span className="text-red-600">*</span> are required.
            Your feedback is valued.
          </p>
        </form>
      </div>

      {/* Add CSS-in-JS or global CSS for base input/button styles for better maintainability */}
      <style jsx global>{`
        .form-input,
        .form-textarea {
          @apply w-full p-3 border rounded-lg shadow-sm bg-gray-700 text-gray-200 placeholder-gray-500 transition-colors duration-200;
        }
        .input-base {
          @apply border-gray-600 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:border-red-500 focus:ring-red-500;
        }
        .input-error {
          @apply border-red-500 ring-1 ring-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:border-red-500 focus:ring-red-500;
        }
        .error-message {
          @apply mt-1 text-sm text-red-400;
        }
        .form-checkbox {
          @apply h-4 w-4 rounded border-gray-500 bg-gray-600 text-red-600 focus:ring-red-500 focus:ring-offset-gray-800 cursor-pointer;
        }
        .form-radio {
          @apply h-4 w-4 border-gray-500 bg-gray-600 text-red-600 focus:ring-red-500 focus:ring-offset-gray-800 cursor-pointer;
        }
        .btn {
          @apply flex items-center justify-center px-5 py-2.5 font-medium rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-60 disabled:cursor-not-allowed;
        }
        .btn-primary {
          @apply bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-md hover:shadow-lg;
        }
        .btn-secondary {
          @apply bg-gray-600 hover:bg-gray-500 text-gray-200 focus:ring-gray-400 border border-gray-500 hover:border-gray-400;
        }
        /* Simple fade-in animation */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default FeedbackForm;
