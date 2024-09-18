const express = require("express");

const app = express();

app.get("/user",(req, res) => {
  res.send({firstname:"Anant", lastname:"Verma"});
});
app.post("/user",(req, res) => {
  res.send("Data successfully saved to the database");
});
app.delete("/user",(req, res) => {
  res.send("Deleted successfully");
});

app.use("/test", (req, res) => {
  res.send("test test test");
});


app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777");
});
