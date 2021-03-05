const db = require("../db");

exports.getAll = async () => {
  const text =
    "SELECT extra_topping_code,name,price, description from extra_toppings";

  const response = await db.query(text, []);
  // console.log(rows[0]);

  return response;
};

exports.getOne = async (id) => {
  const text =
    "SELECT extra_topping_code,name,price, description \
    from extra_toppings \
    where  extra_topping_code = $1";

  const response = await db.query(text, [id]);

  // console.log("Query: extraTopping ", response);

  return response;
};

exports.create = async (extra_topping_code, name, price, description) => {
  const text =
    "INSERT INTO extra_toppings (extra_topping_code,name,price, description) VALUES ($1, $2, $3, $4) RETURNING *";

  const response = await db.query(text, [
    extra_topping_code,
    name,
    price,
    description,
  ]);

  // console.log("Query: extraTopping: create: response ", response);

  return response;
};

exports.delete = async (id) => {
  const text =
    "DELETE FROM extra_toppings where extra_topping_code= $1 RETURNING *";
  const response = await db.query(text, [id]);

  //const response = rows[0];

  console.log("Query: extraTopping: delete ", response);

  return response;
};
