/* @refresh reload */
import { render } from "solid-js/web";
import "./index.css";
import App from "./App";

// Add error handling
window.onerror = function (msg, url, lineNo, columnNo, error) {
  console.error("Window Error: ", msg, url, lineNo, columnNo, error);
  return false;
};

window.addEventListener("load", () => {
  console.log("Window loaded");
  const root = document.getElementById("root");
  console.log("Root element found:", root);

  try {
    console.log("Starting render");
    render(() => <App />, root!);
    console.log("Render complete");
  } catch (error) {
    console.error("Render error:", error);
  }
});

// Log initial execution
console.log("index.tsx executed");
