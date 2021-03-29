const pizzaQuery = require("../queries/pizzas");
const db = require("../db");

exports.getAll = async (req, res, next) => {
  try {
    // const response = await pizzaQuery.getAllQuery;

    const response = await pizzaQuery.getAll();

    // console.log("Controllers: pizza: getAll: ", response);

    res.status(200).json({
      status: "ok",

      data: response.rows,
    });
  } catch (err) {
    console.log("[ERROR] ", err);
    res.status(500).json({
      status: "error",

      message: err.message,
      detail: err.detail,
    });
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const id = req.params.id.toUpperCase();

    const response = await pizzaQuery.getOne(id);

    // console.log("Controller: Pizza ", response)

    if (response.rowCount === 0) {
      res.status(404).json({
        status: "error",
        message: `Pizza with code=${id} not found`,
      });
    } else {
      res.status(200).json({
        status: "ok",

        data: response.rows,
      });
    }
  } catch (err) {
    console.log("[ERROR] ", err);
    res.status(500).json({
      status: "error",
      message: err,
    });
  }
};

exports.create = async (req, res, next) => {
  try {
    console.log("Controller: pizza: create: body: ", req.body);

    const pizza_code = req.body.pizza_code.toString();
    const pizza_code_upper = pizza_code.toUpperCase();
    const name = req.body.name;
    const description = req.body.description;
    const price_small = req.body.price_small;
    const price_big = req.body.price_big;
    console.log(pizza_code_upper, name, description, price_small, price_big);

    const response = await pizzaQuery.create(
      pizza_code_upper,
      name,
      description,
      price_small,
      price_big
    );

    console.log("Controller: pizza: create: response: ", response);

    res.status(201).json({
      status: "created",
      data: response.rows[0],
    });
  } catch (err) {
    console.log("[ERROR] ", err);
    res.status(500).json({
      status: "error",

      message: err.detail,
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id.toUpperCase();

    const response = await pizzaQuery.delete(id);

    // console.log("Controller: Pizza ", response)

    if (response.rowCount === 0) {
      res.status(404).json({
        status: "error",
        message: `Pizza with code=${id} not found`,
      });
    } else {
      res.status(200).json({
        status: "ok",

        message: `Pizza with code=${id} deleted`,
      });
    }
  } catch (err) {
    console.log("[ERROR] ", err);
    res.status(500).json({
      status: "error",
      message: err,
    });
  }
};
