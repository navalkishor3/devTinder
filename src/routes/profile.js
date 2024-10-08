const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error while view profile :" + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("invalid Edit request");
    }
    const logedInUser = req.user;

    Object.keys(req.body).forEach((key) => {
      logedInUser[key] = req.body[key];
    });
    // res.save(0);
    //  console.log(logedInUser);

    await logedInUser.save();

    res.json({
      message: "Edit was successful",
      data: logedInUser,
    });
  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
});

module.exports = profileRouter;
