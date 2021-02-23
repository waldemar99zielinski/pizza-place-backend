const pizzaQuery = require("../queries/pizzas");
const db = require("../db");

exports.getAll = async (req, res, next) => {
  try {
    // const data = await pizzaQuery.getAllQuery;

    const data = await pizzaQuery.getAll();

    // console.log(data);

    res.status(200).json({
      status: "ok",

      data,
    });
  } catch (err) {
    console.log("[ERROR] ", err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const id = req.params.id.toUpperCase();

    const data = await pizzaQuery.getOne(id);

    // console.log("Controller: Pizza ", data)

    if (data == undefined) {
      res.status(404).json({
        status: "error",
        message: "Pizza not found",
      });
    } else {
      res.status(200).json({
        status: "ok",

        data,
      });
    }
  } catch (err) {
    console.log("[ERROR] ", err);
  }
};

exports.create = async (req, res, next) => {
  try {
    console.log(req.body);


    const pizza_code = req.body.pizza_code;
    const name = req.body.name;
    const description = req.body.description;
    const price_small = req.body.price_small;
    const price_big = req.body.price_big;
    console.log(pizza_code, name, description, price_small, price_big);

    const data = await pizzaQuery.create(pizza_code, name, description, price_small, price_big);

    console.log(data)

    if (data == undefined) {
      res.status(201).json({
        status: "created",

        data,
      });
    } else {
      res.status(500).json({
        status: "error",

        message: data.detail,
      });
    }
     
    
  } catch (err) {
    console.log("[ERROR] ", err);
  }
};
