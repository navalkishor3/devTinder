const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  console.log("Sending connection requeest");
  res.send("Connection request send");
});

module.exports = requestRouter;
