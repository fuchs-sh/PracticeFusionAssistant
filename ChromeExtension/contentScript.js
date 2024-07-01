console.log("Content script loaded on Practice Fusion");

function createButton() {
  const button = document.createElement("div");
  button.id = "pf-assistant-button";
  button.textContent = "PF";
  document.body.appendChild(button);

  button.addEventListener("click", toggleOverlay);
}

function createOverlay() {
  const overlay = document.createElement("div");
  overlay.id = "pf-assistant-overlay";
  document.body.appendChild(overlay);
}

function toggleOverlay() {
  const overlay = document.getElementById("pf-assistant-overlay");
  overlay.classList.toggle("open");
  updateOverlayContent();
}

function updateOverlayContent() {
  const overlay = document.getElementById("pf-assistant-overlay");
  if (overlay.classList.contains("open")) {
    let visitSummary = window.PFAssistant.dataExtractor.extractVisitSummary();
    let claimSubmission =
      window.PFAssistant.dataExtractor.extractClaimSubmission();

    visitSummary = window.PFAssistant.dataExtractor.removePHI(visitSummary);
    claimSubmission =
      window.PFAssistant.dataExtractor.removePHI(claimSubmission);

    overlay.innerHTML = `
      <h2>Practice Fusion Assistant</h2>
      <h3>Extracted Data:</h3>
      <h4>Visit Summary:</h4>
      <pre>${visitSummary}</pre>
      <h4>Claim Submission:</h4>
      <pre>${claimSubmission}</pre>
      <button id="sendToServer">Process Data</button>
      <div id="serverResponse"></div>
    `;

    document.getElementById("sendToServer").addEventListener("click", () => {
      fetch("http://localhost:3000/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ visitSummary, claimSubmission }),
      })
        .then((response) => response.json())
        .then((data) => {
          document.getElementById("serverResponse").innerHTML = `
          <h3>Suggestions:</h3>
          <h4>Visit Summary:</h4>
          <ul class="suggestion-list">${data.visitSuggestions
            .split(". ")
            .map((s) => `<li>${s}</li>`)
            .join("")}</ul>
          <h4>Claim Submission:</h4>
          <ul class="suggestion-list">${data.claimSuggestions
            .split(". ")
            .map((s) => `<li>${s}</li>`)
            .join("")}</ul>
        `;
        })
        .catch((error) => {
          console.error("Error:", error);
          document.getElementById(
            "serverResponse"
          ).innerHTML = `<p>Error processing data. Please try again.</p>`;
        });
    });
  }
}

createButton();
createOverlay();

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleOverlay") {
    toggleOverlay();
  }
});
