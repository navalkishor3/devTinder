const express = require("express");
const connectDB = require("./config/database");
const app = express(); // server created
const User = require("./modles/user");

const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

///Routes
const authRouter = require("../src/routes/auth");
const profileRouter = require("../src/routes/profile");
const requestRouter = require("../src/routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

// Find single user findone
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });

    if (!user) {
      res.status(404).send("User not found " + userEmail);
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong" + err.message);
  }
});

// delete user
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findOneAndDelete(userId);

    if (!user) {
      res.status(404).send("User not found " + userEmail);
    } else {
      res.send("user deleted " + user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong" + err.message);
  }
});

// update
app.patch("/user/:emailId", async (req, res) => {
  // const emailId = { emailId: req.body.emailId };
  const emailId = { emailId: req.params?.emailId };
  const update = req.body;

  try {
    const ALLOWED_UPDATE_FIELDS = [
      "firstName",
      "lastname",
      "password",
      "age",
      "gender",
      "skills",
      "photoUrl",
    ];
    const isUpdateAllowed = Object.keys(update).every((k) =>
      ALLOWED_UPDATE_FIELDS.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Updates not allowed for this field");
    }
    if (update?.skills.length > 10) {
      throw new Error("skills can not be more than 10");
    }

    const user = await User.findOneAndUpdate(emailId, update, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      res.status(404).send("User not found " + userEmail);
    } else {
      res.send("user updated " + user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong " + err.message);
  }
});

// Feed api
app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});

    if (!user.length) {
      res.status(404).send("User not found " + userEmail);
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong" + err.message);
  }
});
connectDB()
  .then(() => {
    console.log("connected to DB");
    app.listen(3000, () => {
      console.log("Server started");
    });
  })
  .catch((err) => {
    console.log("error while connection to DB");
  });
