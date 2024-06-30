chrome.action.onClicked.addListener((tab) => {
  if (tab.url.includes("practicefusion.com")) {
    chrome.tabs.sendMessage(tab.id, { action: "toggleOverlay" });
  }
});
