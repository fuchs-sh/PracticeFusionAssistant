window.PFAssistant = {
  createOverlay: function () {
    const overlay = document.createElement("div");
    overlay.id = "pf-assistant-overlay";
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        right: 0;
        width: 300px;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.9);
        z-index: 9999;
        padding: 20px;
        box-shadow: -2px 0 5px rgba(0,0,0,0.2);
        overflow-y: auto;
      `;
    document.body.appendChild(overlay);
  },

  removeOverlay: function () {
    const overlay = document.getElementById("pf-assistant-overlay");
    if (overlay) {
      overlay.remove();
    }
  },
};
