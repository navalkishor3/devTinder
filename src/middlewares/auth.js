const jwt = require("jsonwebtoken");
const User = require("../modles/user");

const userAuth = async (req, res, next) => {
  try {
    // Read the token from cookies
    const { token } = req.cookies;

    if (!token) {
      throw new Error("token is not valid");
    }

    // validate token
    // const decodedObj = await jwt.verify(token, "dev@tinderSecretkey");
    const decodedObj = await jwt.verify(token, "dev@tinderSecretkey");
    const { _id } = decodedObj;

    //Find the user
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};

module.exports = {
  userAuth,
};
