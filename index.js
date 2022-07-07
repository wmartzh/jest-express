const dotenv = require("dotenv");
const app = require("./src/app");
const swaggerUi = require("swagger-ui-express");
dotenv.config();

const swaggerDoc = require("./swagger/documentation.json");
const port = Number(process.env.APP_PORT || 8000);
const host = process.env.APP_HOST;

app.use("/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(port, () => {
  console.log(`App listen on ${host}:${port}`);
});
