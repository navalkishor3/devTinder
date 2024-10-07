const express = require("express");
const authRouter = express.Router();
const { validateSignupData } = require("../utils/validation");
const User = require("../modles/user");
const bcrypt = require("bcrypt");
const validator = require("validator");

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
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
    // const isValidPassword = await bcrypt.compare(password, user.password);
    const isValidPassword = await user.validatePassword(password);
    //console.log(isValidPassword);

    if (!isValidPassword) {
      throw new Error("Invalid Credentials");
    } else {
      // create jwt tokken
      const token = await user.getJWT();

      //send token into cokkies

      // console.log(token);
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
      });
      res.send("user login successfully");
    }
  } catch (err) {
    res.status(400).send("Error while login :" + err.message);
  }
});

module.exports = authRouter;
