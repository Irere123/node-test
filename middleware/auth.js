const config = require("config");
const jwt = require("jsonwebtoken");

const tokenConfig = config.get("server.tokens");

const isAuth =
  (shouldThrow = true) =>
  async (req, res, next) => {
    const header = req.headers.authorization;
    const accessToken = header.split(" ")[1];

    console.log(header);

    if (!accessToken) {
      return res.status(400).json({ error: "Auth token must be provided" });
    }

    const { userId } = jwt.verify(accessToken, tokenConfig.TokenSecret);

    if (!userId && shouldThrow) {
      return res.status(400).json({ error: "Not authenticated" });
    }

    req.userId = userId;

    next();
  };

module.exports = { isAuth };
