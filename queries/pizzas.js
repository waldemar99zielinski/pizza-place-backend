const db = require("../db");

exports.getAllQuery = async () => {
  try {
    const text =
      "SELECT pizza_code,name,description,price_small,price_big from pizzas";

    const { rows } = await db.query(text, []);
    console.log(rows);
    return rows;
  } catch (err) {
    throw err;
  }
};
