import React from "react";

const NoRefundPolicy = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg text-white">
      <h1 className="text-3xl font-bold text-red-600 mb-4">No Refund Policy</h1>
      <p className="text-gray-700 mb-4">
        Thank you for purchasing a ticket for TEDxNERIST. Please read our policy
        carefully.
      </p>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">No Refunds</h2>
      <p className="text-gray-700 mb-4">
        All ticket sales are final. We do not offer refunds or exchanges for any
        reason, including but not limited to:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>Change of mind</li>
        <li>Scheduling conflicts</li>
        <li>Personal circumstances</li>
        <li>Event modifications or rescheduling</li>
      </ul>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Event Cancellation
      </h2>
      <p className="text-gray-700 mb-4">
        In the rare case that TEDxNERIST is canceled due to unforeseen
        circumstances, we will provide updates regarding possible rescheduling.
        However, no refunds will be issued.
      </p>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Contact Us</h2>
      <p className="text-gray-700">
        If you have any questions regarding our policy, feel free to contact us
        at <span className="text-blue-600">billing@tedxnerist.com</span>.
      </p>
    </div>
  );
};

export default NoRefundPolicy;
