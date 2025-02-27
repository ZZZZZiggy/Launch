const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("."));

app.post("/api/subscribe", async (req, res) => {
  const { email } = req.body;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("get subscribe request", email);

  res.json({
    success: true,
    message: "submission succeed",
  });
});

app.listen(port, () => {
  console.log(`lannched on http://localhost:${port}`);
});
