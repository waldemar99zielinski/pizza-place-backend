const db = require("../db");

exports.getAll = async () => {
  try {
    const text = "SELECT pizza_code,name,price_small,price_big from pizzas";

    const { rows } = await db.query(text, []);
    console.log(rows[0]);

    return rows;
  } catch (err) {
    throw err;
  }
};

exports.getOne = async (id) => {
  try {
    const text =
      "SELECT pizza_code,name,description,price_small,price_big from pizzas where pizza_code = $1";

    const { rows } = await db.query(text, [id]);

    const data = rows[0];

    return data;
  } catch (err) {
    throw err;
  }
};

exports.create = async (pizza_code, name, description, price_small, price_big) => {
  try {
    const text =
      "INSERT INTO pizzas (pizza_code, name,description, price_small, price_big) VALUES ($1, $2, $3, $4, $5);";

    const { rows } = await db.query(text, [
      pizza_code,
      name,
      description,
      price_small,
      price_big,
    ]);

    console.log("pizza create: ", rows);

    const data = rows[0];
    return data;
  } catch (err) {
    return err;
  }
};

