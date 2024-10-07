const mongoose = require("mongoose");
var validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("No a valid email id " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Not a strong password " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://as2.ftcdn.net/v2/jpg/07/89/90/77/1000_F_789907714_6Rkh5P3eREyVZV9XQx2if7MB53aoasS1.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("No valid url" + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is default about of user",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "dev@tinderSecretkey", {
    expiresIn: "1d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    user.password
  );
  return isPasswordValid;
};

// userSchema.methods.passwordHash = async function (passwordInputByUser) {
//   return await bcrypt.hash(passwordInputByUser, 10);
// };

const User = mongoose.model("User", userSchema);
module.exports = User;
