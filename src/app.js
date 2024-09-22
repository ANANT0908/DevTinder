const express = require("express");
const connectDB = require("./cofig/database");
const app = express();
const User = require("./modals/user");
const bcrypt = require("bcrypt");
const validator = require("validator")

const { validateSignUpData } = require("./utils/validation");

app.use(express.json());

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
      res.send("Login Successfully!!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    // const user = await User.findOne({ emailId: userEmail });
    // if(!user){
    //   res.status(404).send("User not found");
    // }else{
    //   res.send(user);
    // }
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("User Not Found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Error getting the user " + err.message);
  }
});
app.get("/userById", async (req, res) => {
  const id = req.body.id;
  try {
    const users = await User.findById(id);
    if (users.length === 0) {
      res.status(404).send("User Not Found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Error getting the user " + err.message);
  }
});
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("User Not Found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Error getting the user " + err.message);
  }
});
app.delete("/user", async (req, res) => {
  try {
    const resp = await User.findByIdAndDelete(req.body.userId);
    res.send(resp);
  } catch (err) {
    res.status(400).send("Error Deleting the user " + err.message);
  }
});
app.patch("/user/:userId", async (req, res) => {
  try {
    const userId = req.params?.userId;
    const data = req.body;

    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }

    const resp = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
      runValidators: true,
    });
    res.send(resp);
  } catch (err) {
    res.status(400).send("Error Updating the user by id " + err.message);
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
