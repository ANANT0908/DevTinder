const express = require("express");
const { userAuth } = require("../middlewares/auth");
const User = require("../modals/user");
const { validateEditProfileData, validatePasswordProfileData } = require("../utils/validation");
const profileRouter = express.Router();
const validator = require("validator");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    if(req.user){
      res.send(req.user);
    }
    else{
      res.status(400).send("ERROR : " + err.message);
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request ");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    if (!validatePasswordProfileData(req)) {
      throw new Error("Invalid Edit Request ");
    }

    if(!validator.isStrongPassword(req.body.password)){
      throw new Error("Use strong password");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName}, your profile Password updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;
