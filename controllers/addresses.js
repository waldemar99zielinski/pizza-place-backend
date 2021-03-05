const addressesQuery = require("../queries/addresses");
const db = require("../db");

exports.getAll = async (req, res, next) => {
  try {
    // const response = await addressesQuery.getAllQuery;

    const response = await addressesQuery.getAll();

    // console.log(response);

    res.status(200).json({
      status: "ok",

      data: response.rows,
    });
  } catch (err) {
    console.log("[ERROR] ", err);
    res.status(500).json({
      status: "error",

      message: err.detail,
    });
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const id = req.params.id;

    const response = await addressesQuery.getOne(id);

    // console.log("Controller: addresses ", response)

    if (response.rowCount === 0) {
      res.status(404).json({
        status: "error",
        message: `addresses with code=${id} not found`,
      });
    } else {
      res.status(200).json({
        status: "ok",

        data: response.rows,
      });
    }
  } catch (err) {
    console.log("[ERROR] ", err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.create = async (req, res, next) => {
  try {
    console.log("Controller: addresses: create: body: ", req.body);

    const city = req.body.city || console.log("\nWOW GREAT IDEA\n");
    const street = req.body.street;
    const street_number = req.body.street_number;
    const apartment_number = req.body.apartment_number;

    const response = await addressesQuery.create(
      city,
      street,
      street_number,
      apartment_number
    );

    console.log("Controller: pizza: create: response: ", response);

    res.status(201).json({
      status: "created",
      data: response.rows[0],
    });
  } catch (err) {
    console.log("[ERROR] ", err);
    res.status(500).json({
      status: "error",

      message: err.message,
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id;

    const response = await addressesQuery.delete(id);

    // console.log("Controller: addresses ", response)

    if (response.rowCount === 0) {
      res.status(404).json({
        status: "error",
        message: `addresses with code=${id} not found`,
      });
    } else {
      res.status(200).json({
        status: "ok",

        message: `addresses with code=${id} deleted`,
        data: response.rows[0],
      });
    }
  } catch (err) {
    console.log("[ERROR] ", err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
