const express = require("express");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const bodyParser = require("body-parser");
const debug = require("debug")("api");

const swaggerDocument = require("./swagger.json");
const userRoutes = require("./routes/user");
const connectDb = require("./config/db");

// CONNECT TO DB AND LOAD CONFIG
dotenv.config();
connectDb();

debug("booting %o", "App");

// Application
const app = express();

const options = {};

app.use(bodyParser.json());
app.use("/api/v1/user", userRoutes);

app.get("/docs.json", (_req, res) => res.json(swaggerDocument));
app.use("/docs", swaggerUi.serveFiles(swaggerDocument, options));
app.use("/docs", swaggerUi.setup(swaggerDocument, options));

app.listen(process.env.PORT, () => {
  console.log("🚀 server started running on port 4000");
});
