const express = require("express");

const app = express();

// const {adminAuth, userAuth} = require("./middlewares/auth");

// app.use("/admin", adminAuth);

// app.get("/user/login", (req, res) => {
//   res.send("User Login");
// });
// app.get("/user",userAuth, (req, res) => {
//   res.send("User Data sent");
// });

// app.get("/admin/getAllData", (req, res) => {
//   res.send("All Data sent");
// });
// app.get("/admin/deleteUser", (req, res) => {
//   res.send("Deleted a user");
// });


app.get("/getUserData", (req, res) => {
  throw new Error("dsalkfa");
  res.send("Sent User Data");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});
app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777");
});
