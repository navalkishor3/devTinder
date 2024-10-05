const express = require("express");
const connectDB = require("./config/database");
const app = express(); // server created
const User = require("./modles/user");

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "pawan",
    lastName: "ratola",
    emailId: "pawan@gmail.com",
    password: "pawan",
    age: 31,
    gender: "male",
  };

  const user = new User(userObj);
  try {
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("Error while saving user to Db " + err.message);
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
