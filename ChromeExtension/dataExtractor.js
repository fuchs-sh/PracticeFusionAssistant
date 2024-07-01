window.PFAssistant.dataExtractor = {
  extractVisitSummary: function () {
    // This is still a placeholder. We'll need to adjust this based on the actual structure of Practice Fusion's pages
    const summaryElement =
      document.querySelector(".visit-summary") || document.body;
    return summaryElement ? summaryElement.innerText : "No visit summary found";
  },

  extractClaimSubmission: function () {
    // This is still a placeholder. We'll need to adjust this based on the actual structure of Practice Fusion's pages
    const claimElement =
      document.querySelector(".claim-submission") || document.body;
    return claimElement ? claimElement.innerText : "No claim submission found";
  },

  removePHI: function (text) {
    // Remove names (this is a simple approach and may need refinement)
    text = text.replace(/\b[A-Z][a-z]+ [A-Z][a-z]+\b/g, "[REDACTED NAME]");

    // Remove dates
    text = text.replace(/\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/g, "[REDACTED DATE]");

    // Remove SSN
    text = text.replace(/\b\d{3}-\d{2}-\d{4}\b/g, "[REDACTED SSN]");

    // Remove phone numbers
    text = text.replace(
      /\b(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}\b/g,
      "[REDACTED PHONE]"
    );

    // Remove email addresses
    text = text.replace(
      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
      "[REDACTED EMAIL]"
    );

    // Remove IP addresses
    text = text.replace(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g, "[REDACTED IP]");

    // Remove medical record numbers (assuming they're 10 digits)
    text = text.replace(/\b\d{10}\b/g, "[REDACTED MRN]");

    return text;
  },
};
