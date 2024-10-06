const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("Name lenth is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Not a valid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Not a strong password1");
  }
};

module.exports = {
  validateSignupData,
};
