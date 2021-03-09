const db = require("../db");

exports.getAll = async () => {
  const text =
    "SELECT address_id, city, street, street_number, apartment_number from addresses";

  const response = await db.query(text, []);
  // console.log(rows[0]);

  return response;
};

exports.getOne = async (id) => {
  const text =
    "SELECT address_id, city, street, street_number, apartment_number \
    from addresses \
    where  address_id = $1";

  const response = await db.query(text, [id]);

  // console.log("Query: address ", response);

  return response;
};

exports.create = async (city, street, street_number, apartment_number) => {
  const text =
    "INSERT INTO addresses (city, street, street_number, apartment_number) VALUES ($1, $2, $3, $4) RETURNING *";

  const response = await db.query(text, [
    city,
    street,
    street_number,
    apartment_number,
  ]);

  // console.log("Query: address: create: response ", response);

  return response;
};

exports.delete = async (id) => {
  const text = "DELETE FROM addresses where address_id= $1 RETURNING *";
  const response = await db.query(text, [id]);

  //const response = rows[0];

  console.log("Query: address: delete ", response);

  return response;
};
