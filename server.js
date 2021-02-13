//enviromental variables
const dotenv = require("dotenv");
dotenv.config({ path: "./configuration.env" });

const Pool = require("pg").Pool;
const app = require("./app");

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`[INFO] App is running on port ${port}, ${process.env.NODE_ENV}`);
});
