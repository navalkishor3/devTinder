const express = require("express");

const app = express(); // server created
const { adminAuth, userAuth } = require("./middlewares/auth");

// // ---  /ab?c means /abc & /ac allowed
// app.get("/ab?c", (req, res) => {
//   res.send({ firstname: "naval" });
// });

// /ab+c means a & c will be first and last and b will be one or many times in between a&c.
// /abc || /abbc || /abbbc ||
// app.get("/ab+c", (req, res) => {
//   res.send({ firstname: "naval" });
// });

// /abc || /abDDFFFFDDDc
// // * means anything or nothing between ab & c
// app.get("/ab*c", (req, res) => {
//   res.send({ firstname: "naval" });
// });

// /ad || abcd -- bc is optional
// app.get("/a(bc)?d", (req, res) => {
//   res.send({ firstname: "naval" });
// });

// This regex neans if "a" comes in url that it will pass
// eg  /a || /bdfda ||  / dfga
// app.get(/a/, (req, res) => {
//   res.send({ firstname: "naval" });
// });

// it means start with nothing or anything but ends with fly
// app.get(/.*fly$/, (req, res) => {
//   res.send({ firstname: "naval" });
// });

// For query parameter
/// http://localhost:3000/user?name=naval&place=delhi
// req.query = { name: 'naval', place: 'delhi' }
// app.get("/user", (req, res) => {
//   console.log(req.query);
//   res.send({ firstname: "naval" });
// });

// for paramter
//  req.params = { userId: '123' }
// app.get("/user/:userId", (req, res) => {
//   console.log(req.params);
//   res.send({ firstname: "naval" });
// });

// app.get("/user", (req, res) => {
//   res.send({ firstname: "naval" });
// });

// app.post("/user", (req, res) => {
//   //save data to DB
//   res.send("Data successfull saved to the DB");
// });

// app.delete("/user", (req, res) => {
//   //save data to DB
//   res.send("Data deleteed from DB");
// });

// // handling request
// app.use("/hello", (req, res) => {
//   res.send("Hello3 from server");
// });

// app.use("/test", (req, res) => {
//   res.send("test from server");
// });
app.use("/admin", adminAuth);

// app.get("/user", (req, res, next) => {
//   console.log("route user1");
//   next();
//   //res.send("response from router hander 1");
// });

app.get("/user", userAuth, (req, res, next) => {
  console.log("route user2");
  res.send("response from router hander 2");
});

app.get("/admin/getAllData", (req, res, next) => {
  res.send("All data Sent");
});

app.get("/admin/deleteUser", (req, res, next) => {
  res.send("delet a user");
});

app.listen(3000, () => {
  console.log("Server started");
});
