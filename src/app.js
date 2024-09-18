const express = require("express");

const app = express();

app.use("/hello", (req, res) => {
  res.send("Hello hello hello");
});
app.use("/test", (req, res) => {
  res.send("test test test");
});
app.use("/", (req, res) => {
  res.send("N from the dashboard");
});

app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777");
});
