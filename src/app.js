const express = require("express");
const router = require("./routes/router");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use("/v1", router);

module.exports = app;
