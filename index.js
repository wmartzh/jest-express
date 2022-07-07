const dotenv = require("dotenv");
const app = require("./src/app");
dotenv.config();
const port = Number(process.env.APP_PORT || 8000);
const host = process.env.APP_HOST;

app.listen(port, () => {
  console.log(`App listen on ${host}:${port}`);
});
