const customerOrderQuery = require("../queries/orders/customerOrders");
const pizzaOrderQuery = require("./../queries/orders/pizzaOrders");
const addressQuery = require("./../queries/addresses");
const pizzaQuery = require("./../queries/pizzas");
const db = require("../db");
const pizzaSize = require("./const/pizzaSize");
const { request } = require("express");

exports.getAll = async (req, res, next) => {
  try {
    const response = await customerOrderQuery.getAll();

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
//TODO
exports.getOne = async (req, res, next) => {
  try {
    const customer_id = req.params.customer_id;
    const date = req.params.date;

    const response = await customerOrderQuery.getOne(customer_id, date);

    // console.log("Controller: addresses ", response)

    if (response.rowCount === 0) {
      res.status(404).json({
        status: "error",
        message: `Order with customer_id=${customer_id} and date=${date} not found`,
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
  const client = await db.client();

  try {
    //body
    const customer_id = req.body.customer_id;
    const delivery = req.body.delivery;
    const payment = req.body.payment;
    const pizzasToOrder = req.body.pizzas_to_order;

    //error handling
    if (pizzasToOrder === undefined || pizzasToOrder.length === 0) {
      throw new Error("pizzas are not defined");
    }

    //transaction info date, number
    const date = new Date();
    let pizzaOrderCount = 1;
    let totalPrice = 0;
    console.log("Controller:orders:create: totalprize ", totalPrice);
    //transaction
    await client.query("BEGIN");

    //customer order
    const customerOrder = await client.query(customerOrderQuery.createText, [
      customer_id,
      date,
      99999,
      delivery,
      payment,
    ]);

    //pizzaOrders
    for (p of pizzasToOrder) {
      const pizza = await (
        await client.query(pizzaQuery.getOneText, [p.pizza_code])
      ).rows[0];

      const pizzaOrdered = await client.query(pizzaOrderQuery.createText, [
        customer_id,
        date,
        pizzaOrderCount,
        p.extra_topping_code,
        p.pizza_code,
        p.size,
      ]);
      //update total order price
      if (p.size == pizzaSize.LARGE) {
        console.log("LARGE");
        totalPrice += Number(pizza.price_big);
      } else if (p.size == pizzaSize.SMALL) {
        console.log("SMALL");
        totalPrice += Number(pizza.price_small);
      } else {
        throw new Error("pizza size unknown");
      }
      console.log("Controller:orders:create: totalprize ", totalPrice);
      //update order pizza number
      pizzaOrderCount++;
    }

    //update total price
    const customerOrderUpdate = await client.query(
      customerOrderQuery.updatePriceText,
      [customer_id, date, totalPrice]
    );

    await client.query("COMMIT");

    // console.log("Controller: orders: create: body: ", pizzas);

    const createdOrder = await customerOrderQuery.getOne(customer_id, date);

    res.status(201).json({
      status: "created",
      data: createdOrder.rows,
    });
  } catch (err) {
    console.log("[ERROR] ", err);
    await client.query("ROLLBACK");
    res.status(500).json({
      status: "error",

      message: err.message,

      details: err.detail,
    });
  } finally {
    client.release();
  }
};

//TODO:
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
