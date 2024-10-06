const express = require("express");
const connectDB = require("./config/database");
const app = express(); // server created
const User = require("./modles/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    // validate data
    validateSignupData(req);

    const { firstName, lastName, emailId, password } = req.body;

    //Encrpt password
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("Error while saving user to Db :" + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // validate data
    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid Credentials");
    }

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("User Does not exist");
    }

    //Compare password
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log(isValidPassword);

    if (!isValidPassword) {
      throw new Error("Invalid Credentials");
    } else {
      res.send("user login successfully");
    }
  } catch (err) {
    res.status(400).send("Error while login :" + err.message);
  }
});
// Find single user
// app.get("/user", async (req, res) => {
//   const userEmail = req.body.emailId;
//   try {
//     const user = await User.find({ emailId: userEmail });

//     if (!user.length) {
//       res.status(404).send("User not found " + userEmail);
//     } else {
//       res.send(user);
//     }
//   } catch (err) {
//     res.status(400).send("Something went wrong" + err.message);
//   }
// });

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

// findById
// app.get("/user", async (req, res) => {
//   const userId = req.body._id;
//   // 67016e26a915c889ccbf8fff
//   console.log(userId);
//   try {
//     const user = await User.findById({ _id: userId });

//     if (!user) {
//       res.status(404).send("User not found " + user);
//     } else {
//       res.send(user);
//     }
//   } catch (err) {
//     res.status(400).send("Something went wrong" + err.message);
//   }
// });

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
