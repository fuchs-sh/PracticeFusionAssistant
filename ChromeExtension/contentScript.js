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

    fetch("http://localhost:3000/process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ visitSummary, claimSubmission }),
    })
      .then((response) => response.json())
      .then((data) => {
        overlay.innerHTML = `
        <h2>Practice Fusion Assistant</h2>
        <h3>Visit Summary Suggestions:</h3>
        <p>${data.visitSuggestions}</p>
        <h3>Claim Submission Suggestions:</h3>
        <p>${data.claimSuggestions}</p>
      `;
      })
      .catch((error) => {
        console.error("Error:", error);
        overlay.innerHTML = `<p>Error processing data. Please try again.</p>`;
      });
  }
}

// Rest of the code remains the same...
