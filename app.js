const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

//routers
const pizzaRouter = require("./routes/pizzas");

const app = express();

app.use(helmet());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
