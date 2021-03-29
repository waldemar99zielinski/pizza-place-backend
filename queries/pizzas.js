const db = require("../db");

exports.getAllText =
  "SELECT pizza_code,name,price_small,price_big, image from pizzas";

exports.getAll = async () => {
  const response = await db.query(this.getAllText, []);
  // console.log("Query: pizza: getAll ", response);

  return response;
};

exports.getOneText =
  "SELECT pizza_code,name,description,price_small,price_big from pizzas where pizza_code = $1";

exports.getOne = async (id) => {
  const response = await db.query(this.getOneText, [id]);

  // console.log("Query: pizza ", response);

  return response;
};

exports.createText =
  "INSERT INTO pizzas (pizza_code, name,description, price_small, price_big) VALUES ($1, $2, $3, $4, $5) RETURNING *;";

exports.create = async (
  pizza_code,
  name,
  description,
  price_small,
  price_big
) => {
  const response = await db.query(this.createText, [
    pizza_code,
    name,
    description,
    price_small,
    price_big,
  ]);

  // console.log("Query: pizza: create: response ", response);

  return response;
};

exports.deleteText = "DELETE FROM pizzas where pizza_code = $1";

exports.delete = async (id) => {
  const response = await db.query(this.deleteText, [id]);

  //const response = rows[0];

  // console.log("Query: pizza: delete ", response);

  return response;
};
