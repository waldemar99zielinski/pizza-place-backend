const db = require("../../db");

exports.getAllText =
  "SELECT customer_id,date::timestamptz, total_price, delivery, payment from customer_orders";

exports.getAll = async () => {
  const response = await db.query(this.getAllText, []);
  console.log(response);

  return response;
};
exports.getOneText =
  "SELECT co.customer_id, co.date, co.total_price,co.delivery, co.payment,\
   po.pizza_order_number, po.extra_topping_code, p.name,po.size, p.price_small, p.price_big\
    from customer_orders co \
    LEFT JOIN pizza_orders po ON po.customer_id = co.customer_id AND po.date = co.date\
    LEFT JOIN pizzas p ON p.pizza_code = po.pizza_code\
    where co.customer_id = $1 AND co.date = $2";
//TODO:
exports.getOne = async (id, date) => {
  const response = await db.query(this.getOneText, [id, date]);

  // console.log("Query: customerOrder: getOne ", id, date);

  return response;
};

exports.createText =
  "INSERT INTO customer_orders (customer_id,date, total_price, delivery, payment) \
    VALUES ($1, $2, $3, $4, $5) RETURNING * ";

exports.create = async (customer_id, date, total_price, delivery, payment) => {
  const response = await db.query(this.createText, [
    customer_id,
    date,
    total_price,
    delivery,
    payment,
  ]);

  // console.log("Query: customerOrder: create: response ", response);

  return response;
};

//TODO:
exports.delete = async (customer_id, date) => {
  const text =
    "DELETE FROM customer_orders  where  customer_id = $1 AND date = $2 RETURNING *";
  const response = await db.query(text, [customer_id, date]);

  //const response = rows[0];

  console.log("Query: customerOrder: delete ", response);

  return response;
};

exports.updatePriceText =
  "UPDATE customer_orders SET total_price = $3 where customer_id = $1 AND date = $2 RETURNING *";

exports.update = async (customer_id, date, price) => {
  const response = await db.query(this.updatePriceText, [
    customer_id,
    date,
    price,
  ]);

  console.log("Query: customerOrder: updatePrice ", response);

  return response;
};
