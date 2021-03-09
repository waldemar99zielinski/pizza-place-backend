const db = require("../db");

exports.getAllText =
  "SELECT customer_id, name, phone_number, address_id from customers";

exports.getAll = async () => {
  const { rows } = await db.query(this.getAllText, []);
  // console.log(rows[0]);

  return rows;
};

exports.getOneText =
  "SELECT c.customer_id, c.name, c.phone_number, a.city, a.street, a.street_number, a.apartment_number \
    FROM customers c \
    LEFT JOIN addresses a on a.address_id = c.address_id \
    where  c.customer_id = $1";

exports.getOne = async (id) => {
  const response = await db.query(this.getAllText, [id]);

  // console.log("Query: customer ", response);

  return response;
};

exports.createText =
  "INSERT INTO customers (name, phone_number, address_id) VALUES ($1, $2, $3) RETURNING *";

exports.create = async (name, phone_number, address_id) => {
  const response = await db.query(this.createText, [
    name,
    phone_number,
    address_id,
  ]);

  // console.log("Query: customer: create: response ", response);

  return response;
};

exports.deleteText = "DELETE FROM customers where  customer_id= $1 RETURNING *";

exports.delete = async (id) => {
  const response = await db.query(this.deleteText, [id]);

  //const response = rows[0];

  console.log("Query: customer: delete ", response);

  return response;
};
