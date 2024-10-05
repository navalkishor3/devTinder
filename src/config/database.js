const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://emailnaval2:emailnaval2@nkrnode.lnjiy.mongodb.net/devTinder"
  );
};
module.exports = connectDB;
