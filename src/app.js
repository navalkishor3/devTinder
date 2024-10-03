const express = require("express");

const app = express(); // server created

// handling request
app.use("/hello", (req, res) => {
  res.send("Hello3 from server");
});

app.use("/test", (req, res) => {
  res.send("test from server");
});

app.listen(3000, () => {
  console.log("Server started");
});
