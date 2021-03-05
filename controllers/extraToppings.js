const extraToppingsQuery = require("../queries/extraToppings");
const db = require("../db");

exports.getAll = async (req, res, next) => {
  try {
    // const response = await extraToppingsQuery.getAllQuery;

    const response = await extraToppingsQuery.getAll();

    // console.log(response);

    res.status(200).json({
      status: "ok",

      data: response.rows,
    });
  } catch (err) {
    console.log("[ERROR] ", err);
    res.status(500).json({
      status: "error",

      message: err.detail,
    });
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const id = req.params.id;

    const response = await extraToppingsQuery.getOne(id);

    // console.log("Controller: extraToppings ", response)

    if (response.rowCount === 0) {
      res.status(404).json({
        status: "error",
        message: `extraToppings with code=${id} not found`,
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
      message: err.message,
    });
  }
};

exports.create = async (req, res, next) => {
  try {
    console.log("Controller: extraToppings: create: body: ", req.body);

    const extra_topping_code = req.body.extra_topping_code;
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;

    const response = await extraToppingsQuery.create(
      extra_topping_code,
      name,
      price,
      description
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

      message: err.message,
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id;

    const response = await extraToppingsQuery.delete(id);

    // console.log("Controller: extraToppings ", response)

    if (response.rowCount === 0) {
      res.status(404).json({
        status: "error",
        message: `extraToppings with code=${id} not found`,
      });
    } else {
      res.status(200).json({
        status: "ok",

        message: `extraToppings with code=${id} deleted`,
        data: response.rows[0],
      });
    }
  } catch (err) {
    console.log("[ERROR] ", err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
