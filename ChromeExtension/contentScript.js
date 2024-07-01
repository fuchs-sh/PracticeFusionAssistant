console.log("Content script loaded on Practice Fusion");

function updateOverlayContent() {
  const overlay = document.getElementById("pf-assistant-overlay");
  if (overlay) {
    let visitSummary = window.PFAssistant.dataExtractor.extractVisitSummary();
    let claimSubmission =
      window.PFAssistant.dataExtractor.extractClaimSubmission();

    visitSummary = window.PFAssistant.dataExtractor.removePHI(visitSummary);
    claimSubmission =
      window.PFAssistant.dataExtractor.removePHI(claimSubmission);

    overlay.innerHTML = `
      <h2>Practice Fusion Assistant</h2>
      <h3>Visit Summary:</h3>
      <p>${visitSummary}</p>
      <h3>Claim Submission:</h3>
      <p>${claimSubmission}</p>
    `;
  }
}

// Create the overlay when the page loads
window.PFAssistant.createOverlay();
updateOverlayContent();

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleOverlay") {
    const overlay = document.getElementById("pf-assistant-overlay");
    if (overlay) {
      window.PFAssistant.removeOverlay();
    } else {
      window.PFAssistant.createOverlay();
      updateOverlayContent();
    }
  }
});
