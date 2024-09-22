const express = require("express");
const connectDB = require("./cofig/database");
const app = express();
const User = require("./modals/user");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { validateSignUpData } = require("./utils/validation");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());

app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid Email");
    }

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
        expiresIn: "7d",
      });
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login Successfully!!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
app.get("/profile", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
app.post("/sendingConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    console.log("Sending a connection request");
    res.send(user.firstName + " sent the connection request");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.patch("/userByEmailId", async (req, res) => {
  try {
    const emailId = req.body.emailId;
    const body = req.body;
    const resp = await User.findOneAndUpdate({ emailId: emailId }, body, {
      returnDocument: "before",
      runValidators: true,
    });
    res.send(resp);
  } catch (err) {
    res.status(400).send("Error Updating the user by email" + err.message);
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
