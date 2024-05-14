const mongoose = require("mongoose");

const foodSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const FoodModel = mongoose.model("food", foodSchema);

module.exports = FoodModel;
