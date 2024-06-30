import { createOverlay, removeOverlay } from "./overlay.js";

console.log("Content script loaded on Practice Fusion");

// Create the overlay when the page loads
createOverlay();

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleOverlay") {
    const overlay = document.getElementById("pf-assistant-overlay");
    if (overlay) {
      removeOverlay();
    } else {
      createOverlay();
    }
  }
});
