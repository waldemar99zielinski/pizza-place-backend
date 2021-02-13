const express = require("express");
const cors = require("cors");
const app = express();

//routers
const pizzaRouter = require("./routes/pizzas");

app.use(cors());

const apiRoute = "/api/v1";

app.use(`${apiRoute}/pizzas`, pizzaRouter);

app.use("*", (req, res) => {
  console.log(req);
  res.status(404).json({
    status: "error",

    message: "path not found",
  });
});

module.exports = app;
