import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Analytics } from "@vercel/analytics/react";
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>
);
