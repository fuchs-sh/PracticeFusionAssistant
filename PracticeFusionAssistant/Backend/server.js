const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/process", (req, res) => {
  const { visitSummary, claimSubmission } = req.body;

  // TODO: Implement actual processing logic here
  console.log("Received visit summary:", visitSummary);
  console.log("Received claim submission:", claimSubmission);

  // For now, just echo back the received data
  res.json({
    visitSuggestions: `Processed visit summary: ${visitSummary}`,
    claimSuggestions: `Processed claim submission: ${claimSubmission}`,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
