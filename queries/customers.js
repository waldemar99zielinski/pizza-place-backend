const db = require("../db");

exports.getAll = async () => {
  const text =
    "SELECT customer_id, name, phone_number, address_id from customers";

  const { rows } = await db.query(text, []);
  // console.log(rows[0]);

  return rows;
};

exports.getOne = async (id) => {
  const text =
    "SELECT c.customer_id, c.name, c.phone_number, a.city, a.street, a.street_number, a.apartment_number \
    FROM customers c \
    LEFT JOIN addresses a on a.address_id = c.address_id \
    where  c.customer_id = $1";

  const response = await db.query(text, [id]);

  // console.log("Query: customer ", response);

  return response;
};

exports.create = async (name, phone_number, address_id) => {
  const text =
    "INSERT INTO customers (name, phone_number, address_id) VALUES ($1, $2, $3) RETURNING *";

  const response = await db.query(text, [name, phone_number, address_id]);

  // console.log("Query: customer: create: response ", response);

  return response;
};

exports.delete = async (id) => {
  const text = "DELETE FROM customers where  customer_id= $1 RETURNING *";
  const response = await db.query(text, [id]);

  //const response = rows[0];

  console.log("Query: customer: delete ", response);

  return response;
};
