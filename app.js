const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

//routers
const pizzaRouter = require("./routes/pizzas");
const customerRouter = require("./routes/customers");

const app = express();

app.use(helmet());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiRoute = "/api/v1";

//routes
app.use(`${apiRoute}/pizzas`, pizzaRouter);
app.use(`${apiRoute}/customers`, customerRouter);

app.use("*", (req, res) => {
  console.log(req);
  res.status(404).json({
    status: "error",

    message: "path not found",
  });
});

module.exports = app;
