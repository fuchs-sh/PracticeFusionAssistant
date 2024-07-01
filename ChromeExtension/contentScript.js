console.log("Content script loaded on Practice Fusion");

// Create the overlay when the page loads
window.PFAssistant.createOverlay();

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleOverlay") {
    const overlay = document.getElementById("pf-assistant-overlay");
    if (overlay) {
      window.PFAssistant.removeOverlay();
    } else {
      window.PFAssistant.createOverlay();
    }
  }
});
