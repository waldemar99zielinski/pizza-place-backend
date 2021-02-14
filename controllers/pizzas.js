const pizzaQuery = require("../queries/pizzas");
const db = require("../db");

// exports.getAll = async (req, res, next) => {
//   try {
//     // const data = await pizzaQuery.getAllQuery;

//     const text = "SELECT pizza_code,name,price_small,price_big from pizzas";

//     const { rows } = await db.query(text, []);
//     console.log(rows[0]);

//     res.status(200).json({
//       status: "ok",

//       rows,
//     });
//   } catch (err) {
//     console.log("[ERROR] ", err);
//   }
// };
exports.getAll = async (req, res, next) => {
  try {
    // const data = await pizzaQuery.getAllQuery;

    const data = await pizzaQuery.getAll();

    console.log(data);

    res.status(200).json({
      status: "ok",

      data,
    });
  } catch (err) {
    console.log("[ERROR] ", err);
  }
};
// exports.getOne = async (req, res, next) => {
//   try {
//     const id = req.params.id.toUpperCase();

//     const text =
//       "SELECT pizza_code,name,description,price_small,price_big from pizzas where pizza_code = $1";

//     const { rows } = await db.query(text, [id]);

//     const data = rows[0];

//     if (data === undefined) {
//       res.status(404).json({
//         status: "error",
//         message: "Pizza not found",
//       });
//     } else {
//       res.status(200).json({
//         status: "ok",

//         data,
//       });
//     }
//   } catch (err) {
//     console.log("[ERROR] ", err);
//   }
// };
exports.getOne = async (req, res, next) => {
  try {
    const id = req.params.id.toUpperCase();

    const data = pizzaQuery.getOne(id);

    if (data === undefined) {
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
    if (
      req.body.pizza_code === undefined ||
      req.body.name === undefined ||
      req.body.description === undefined ||
      req.body.price_small === undefined ||
      req.body.price_big === undefined
    ) {
      res.status(404).json({
        status: "error",
        message: "",
      });
    }

    const pizza_code = req.body.pizza_code;
    const name = req.body.name;
    const description = req.body.description;
    const price_small = req.price_small;
    const price_big = req.body.price_big;
    req.body.console.log(pizza_code, name, description, price_small, price_big);

    const text =
      "INSERT INTO pizza (pizza_code, name,description, price_small, price_big) VALUES ($1, $2, $3, $4, $5);";

    const { rows } = await db.query(text, [
      pizza_code,
      name,
      description,
      price_small,
      price_big,
    ]);

    console.log("pizza create: ", rows);

    const data = rows[0];

    if (data === undefined) {
      res.status(404).json({
        status: "error",
        message: "",
      });
    } else {
      res.status(201).json({
        status: "created",

        data,
      });
    }
  } catch (err) {
    console.log("[ERROR] ", err);
  }
};
