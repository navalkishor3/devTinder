const express = require("express");
const connectDB = require("./config/database");
const app = express(); // server created
const User = require("./modles/user");
app.use(express.json());
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
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
