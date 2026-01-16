import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6">
      <div className="text-center">
        {/* TEDx NERIST Logo */}
        <div className="mb-6">
          <h1 className="text-red-600 text-6xl font-bold">
            TED<span className="text-white text-4xl">x</span>
          </h1>
          <p className="text-gray-400 text-lg tracking-widest">NERIST</p>
        </div>

        {/* 404 Message */}
        <h2 className="text-red-600 text-8xl font-bold mb-4">404</h2>
        <h3 className="text-2xl font-medium mb-2">
          This idea hasn't spread yet
        </h3>
        <p className="text-gray-400 max-w-md mx-auto">
          The page you're looking for seems to be on a different stage. Perhaps
          it's preparing for its own TED talk?
        </p>

        {/* Navigation Buttons */}
        <div className="mt-6 space-x-4">
          <a
            href="/"
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-md shadow-md transition"
          >
            Return to Home
          </a>
          <a
            href="https://instagram.com/tedxnerist"
            className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white py-2 px-6 rounded-md shadow-md transition"
          >
            See Our Events
          </a>
        </div>

        {/* Footer */}
        <p className="text-gray-500 text-sm mt-10">
          TEDxNERIST &copy; 2025 • This independent TEDx event is operated under
          license from TED
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
