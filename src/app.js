const express = require("express");

const app = express();

app.get(
  "/user",
  [(req, res, next) => {
    console.log("console.log for 1");
    next()
    // res.send("Route Handle 1");
  },
  (req, res,next) => {
    console.log("console.log for 2");
    // res.send("Route Handle 2");
    next()
  }],
  (req, res,next) => {
    console.log("console.log for 3");
    // res.send("Route Handle 3");
    next()
  },
  (req, res,next) => {
    console.log("console.log for 4");
    // res.send("Route Handle 4");
    next()
  },
  (req, res,next) => {
    console.log("console.log for 5");
    res.send("Route Handle 5");
  }
);

app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777");
});
