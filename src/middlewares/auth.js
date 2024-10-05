const adminAuth = (req, res, next) => {
  console.log("Admin auth getting checekd");
  const tolen = "xyz";
  const isAdminAuthorized = tolen === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("User auth getting checekd");
  const token = "xyza";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized user");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
