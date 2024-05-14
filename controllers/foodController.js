const _ = require("lodash");

const FoodModel = require("../models/food.model");

const foodController = {
  getAllFood: async (_req, res) => {
    const users = await FoodModel.find();
    res.json({ users });
  },
  createUser: async (req, res) => {},
};

module.exports = foodController;
