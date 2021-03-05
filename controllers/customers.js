const customerQuery = require("../queries/customers");
const db = require("../db");

exports.getAll = async (req, res, next) => {
  try {
    // const response = await customerQuery.getAllQuery;

    const data = await customerQuery.getAll();

    // console.log(response);

    res.status(200).json({
      status: "ok",

      data,
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

    const response = await customerQuery.getOne(id);

    // console.log("Controller: customer ", response)

    if (response.rowCount === 0) {
      res.status(404).json({
        status: "error",
        message: `Customer with code=${id} not found`,
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
    console.log("Controller: customer: create: body: ", req.body);

    const name = req.body.name;
    const phone_number = req.body.phone_number;
    const address_id = req.body.address_id;

    const response = await customerQuery.create(name, phone_number, address_id);

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

    const response = await customerQuery.delete(id);

    // console.log("Controller: customer ", response)

    if (response.rowCount === 0) {
      res.status(404).json({
        status: "error",
        message: `customer with code=${id} not found`,
      });
    } else {
      res.status(200).json({
        status: "ok",

        message: `customer with code=${id} deleted`,
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
