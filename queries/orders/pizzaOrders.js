const db = require("../../db");
exports.getAllText =
  "SELECT customer_id, date, pizza_order_number, extra_topping_code, pizza_code, price from pizza_orders";
exports.getAll = async () => {
  const response = await db.query(this.getAllText, []);
  // console.log(rows[0]);

  return response;
};

exports.getOneText =
  "SELECT customer_id, date, pizza_order_number, extra_topping_code, pizza_code, price \
    from pizza_orders \
    where  extra_topping_code = $1 AND date = $2 and pizza_order_number = $3";

exports.getOne = async (customer_id, date, pizza_order_number) => {
  const response = await db.query(this.getOneText, [
    customer_id,
    date,
    pizza_order_number,
  ]);

  // console.log("Query: extraTopping ", response);

  return response;
};

exports.createText =
  "INSERT INTO pizza_orders (customer_id, date, pizza_order_number, extra_topping_code, pizza_code, size) \
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING * ";
exports.create = async (
  customer_id,
  date,
  pizza_order_number,
  extra_topping_code,
  pizza_code,
  size
) => {
  const response = await db.query(this.createText, [
    customer_id,
    date,
    pizza_order_number,
    extra_topping_code,
    pizza_code,
    size,
  ]);

  // console.log("Query: extraTopping: create: response ", response);

  return response;
};

exports.deleteText =
  "DELETE FROM pizza_orders where  customer_id = $1 AND date = $2 AND pizza_order_number = $3 RETURNING *";

exports.delete = async (customer_id, date, pizza_order_number) => {
  const response = await db.query(this.deleteText, [
    id,
    date,
    pizza_order_number,
  ]);

  //const response = rows[0];

  console.log("Query: extraTopping: delete ", response);

  return response;
};
