import React from "react";
import ReactDOM from "react-dom/client";
import App from "../components/App";

document.addEventListener("DOMContentLoaded", () => {
  const rootDiv = document.createElement("div");
  rootDiv.id = "root"; // Assign ID
  document.body.appendChild(rootDiv);

  const root = ReactDOM.createRoot(rootDiv);
  root.render(<App />);
});
