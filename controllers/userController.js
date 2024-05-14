const _ = require("lodash");

const { createTokens } = require("../utils/createTokens");
const UserModel = require("../models/user.model");
const argon2 = require("argon2");

const userController = {
  getAllUsers: async (_req, res) => {
    const users = await UserModel.find();

    res.json({ users });
  },
  createUser: async (req, res) => {
    const bodyParams = _.pick(req.body, ["password", "name"]);

    const userInDb = await UserModel.findOne({ name: bodyParams.name });

    if (userInDb) {
      return res.json({ error: "User already exists" });
    }

    const hashedPassword = await argon2.hash(bodyParams.password);

    const user = new UserModel({
      ...bodyParams,
      password: hashedPassword,
    });

    await user.save();

    const tokens = createTokens(user);

    return res.json({ ...tokens });
  },
  login: async (req, res) => {
    const bodyParams = _.pick(req.body, ["password", "name"]);

    const user = await UserModel.findOne({ name: bodyParams.name });

    if (!user) {
      return res.json({ error: "Invalid credentials" });
    }

    const isValid = await argon2.verify(user.password, bodyParams.password);

    if (!isValid) {
      return res.json({ error: "Invalid credentials" });
    }

    const tokens = createTokens(user);

    return res.json({ ...tokens });
  },
};

module.exports = userController;
