const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

requestRouter.post("/sendingConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    console.log("Sending a connection request");
    res.send(user.firstName + " sent the connection request");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
module.exports = requestRouter;
