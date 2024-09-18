const express = require("express");

const app = express();

app.get("/user/:userId",(req, res) => {
  console.log(req.params);
  res.send({firstname:"Anant", lastname:"Verma"});
});
// app.get("/user",(req, res) => {
//   console.log(req.query);
//   res.send({firstname:"Anant", lastname:"Verma"});
// });


app.get("/a(bc)?d",(req, res) => {
  res.send({firstname:"Anant", lastname:"Verma"});
});




app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777");
});
