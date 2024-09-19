const express = require("express");
const connectDB = require("./cofig/database");
const app = express();
const User = require("./modals/user");

app.post("/signup", async (req, res) => {
  console.log("enter");
  const user = new User({
    firstName: "Anant1",
    lastName: "Verma1",
    emailId: "anant1@gmail.com",
    password: "anant1@123"
  });

  try {
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("Error saving the user " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777");
    });
  })
  .catch(() => {
    console.log("Database cannot be connected");
  });
