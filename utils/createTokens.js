const config = require("config");
const jwt = require("jsonwebtoken");

const tokenConfig = config.get("server.tokens");

const createTokens = (user) => {
  const token = jwt.sign({ userId: user.id }, tokenConfig.TokenSecret, {
    expiresIn: "15d",
  });

  return { token };
};

module.exports = { createTokens };
