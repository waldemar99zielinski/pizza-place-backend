const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

//routers
const pizzaRouter = require("./routes/pizzas");
const customerRouter = require("./routes/customers");
const addressRouter = require("./routes/addresses");
const extraToppingRouter = require("./routes/extraToppings");
const ordersRouter = require("./routes/orders");

const app = express();

app.use(helmet());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiRoute = "/api/v1";

//routes
app.use(`${apiRoute}/pizzas`, pizzaRouter);
app.use(`${apiRoute}/customers`, customerRouter);
app.use(`${apiRoute}/addresses`, addressRouter);
app.use(`${apiRoute}/extra-toppings`, extraToppingRouter);
app.use(`${apiRoute}/orders`, ordersRouter);

app.use("*", (req, res) => {
  console.log(req);
  res.status(404).json({
    status: "error",

    message: "path not found",
  });
});

module.exports = app;
