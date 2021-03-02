const db = require("../db");

exports.getAll = async () => {
  const text = "SELECT pizza_code,name,price_small,price_big from pizzas";

  const { rows } = await db.query(text, []);
  // console.log(rows[0]);

  return rows;
};

exports.getOne = async (id) => {
  const text =
    "SELECT pizza_code,name,description,price_small,price_big from pizzas where pizza_code = $1";

  const response = await db.query(text, [id]);

  console.log("Query: pizza ", response);

  return response;
};

exports.create = async (
  pizza_code,
  name,
  description,
  price_small,
  price_big
) => {
  const text =
    "INSERT INTO pizzas (pizza_code, name,description, price_small, price_big) VALUES ($1, $2, $3, $4, $5);";

  const response = await db.query(text, [
    pizza_code,
    name,
    description,
    price_small,
    price_big,
  ]);

  console.log("Query: pizza: create: response ", response);

  return response;
};

exports.delete = async (id) => {
  const text = "DELETE FROM pizzas where pizza_code = $1";
  const response = await db.query(text, [id]);

  //const response = rows[0];

  console.log("Query: pizza: delete ", response);

  return response;
};
