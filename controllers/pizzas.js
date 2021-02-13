const pizzaQuery = require("../queries/pizzas");
const db = require("../db");

exports.getAll = async (req, res, next) => {
  try {
    // const data = await pizzaQuery.getAllQuery;

    const text =
      "SELECT pizza_code,name,description,price_small,price_big from pizzas";

    const { rows } = await db.query(text, []);
    console.log(rows[0]);

    res.status(200).json({
      status: "ok",

      rows,
    });
  } catch (err) {
    console.log("[ERROR] ", err);
  }
};
