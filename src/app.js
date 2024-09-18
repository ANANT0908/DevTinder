const express = require("express");

const app = express();

app.use("/",(req, res,next)=>{
//res.send("Handling / route")
next()
})

app.get(
  "/user",
  (req, res, next) => {
    console.log("Handling /user route");
    next()
  },
  (req, res, next) => {
    console.log("console.log for 1");
    res.send("Route Handle 1");
  }, (req, res, next) => {
    console.log("console.log for 2");
    res.send("Route Handle 2");
  }
);

app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777");
});
