const mongoose = require("mongoose");

const connectDb = async () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/authtest")
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.error(error));
};

module.exports = connectDb;
