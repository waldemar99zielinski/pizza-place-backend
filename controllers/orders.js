const customerOrderQuery = require("../queries/orders/customerOrders");
const pizzaOrderQuery = require("./../queries/orders/pizzaOrders");
const addressQuery = require("./../queries/addresses");
const pizzaQuery = require("./../queries/pizzas");
const customerQuery = require("../queries/customers");
const db = require("../db");
const pizzaSize = require("./const/pizzaSize");
const orderConsts = require("./const/order");
const { request } = require("express");
const order = require("./const/order");

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

exports.getOne = async (req, res, next) => {
  const client = await db.client();
  try {
    const customer_id = req.params.customer_id;
    const date = req.params.date;

    await client.query("BEGIN");

    const responseCustomerOrder = await client.query(
      customerOrderQuery.getOneText,
      [customer_id, date]
    );

    // console.log("Controller: addresses ", responseCustomerOrder);

    if (responseCustomerOrder.rowCount === 0) {
      res.status(404).json({
        status: "error",
        message: `Order with customer_id=${customer_id} and date=${date} not found`,
      });
    }

    const responsePizzaOrders = await client.query(
      pizzaOrderQuery.getAllForOrderText,
      [customer_id, date]
    );

    res.status(200).json({
      status: "ok",

      data: {
        order: responseCustomerOrder.rows,
        pizzas: responsePizzaOrders.rows,
      },
    });
  } catch (err) {
    console.log("[ERROR] ", err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  } finally {
    client.release();
  }
};

exports.create = async (req, res, next) => {
  const client = await db.client();

  try {
    // console.log("Controller:orders:create: date ", date.toISOString());
    //transaction
    await client.query("BEGIN");

    const addressId = await validateAndReturnAddressId(client, req.body);

    // console.log("address: ", address);

    const customer = await validateAndReturnCustomer(
      client,
      req.body,
      addressId
    );
    // console.log("CUSTOMER: ", customer);
    const date = new Date();
    //customer order
    const customerOrder = await client.query(customerOrderQuery.createText, [
      customer.customer_id,
      date,
      99999,
      req.body.order.delivery,
      req.body.order.payment,
    ]);
    //create pizza orders and update total price
    const updatedCustomerOrder = await createPizzaOrdersAndReturnCustomerOrder(
      client,
      req.body,
      customer.customer_id,
      date
    );
    await client.query("COMMIT");

    // console.log("Controller: orders: create: body: ", pizzas);

    res.status(201).json({
      status: "created",
      data: updatedCustomerOrder.rows[0], //createdOrder.rows,
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

const validateAndReturnCustomer = async (client, body, address) => {
  let customer = null;

  if (body.customer.customer_id) {
    const response = await client.query(customerQuery.getOneText, [
      body.customer.customer_id,
    ]);
    //TODO: think about better solution
    customer = response.rows[0];
    // console.log(
    //   "validateAndReturnCustomer: customer exists: \n response: \n",
    //   response,
    //   "\ncustomer\n",
    //   customer
    // );
    if (!customer) {
      throw Error(`Customer with id: ${body.customer.customer_id} not found`);
    }
  } else if (body.customer.name && body.customer.phone) {
    const response = await client.query(customerQuery.createText, [
      body.customer.name,
      body.customer.phone,
      address,
    ]);
    customer = response.rows[0];
    // console.log("validateAndReturnCustomer: customer new ", customer);
  } else {
    //TODO: specify error message
    throw Error("Customer parameters invalid");
  }
  return customer;
};

const validateAndReturnAddressId = async (client, body) => {
  if (body.order.delivery === orderConsts.DELIVERY_YES) {
    const response = await client.query(addressQuery.createText, [
      body.address.city,
      body.address.street,
      body.address.street_number,
      body.address.apartment_number,
    ]);
    // console.log("ADDRESS: response", response);
    const address = response.rows[0];
    return address.address_id;
  }
  return null;
};

const createPizzaOrdersAndReturnCustomerOrder = async (
  client,
  body,
  customer_id,
  date
) => {
  let totalPrice = 0;
  let pizzaOrderCount = 0;
  for (p of body.pizzas_to_order) {
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
      totalPrice += Number(pizza.price_big);
    } else if (p.size == pizzaSize.SMALL) {
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

  return customerOrderUpdate;
};

exports.delete = async (req, res, next) => {
  try {
    const customer_id = req.params.customer_id;
    const date = req.params.date;

    const response = await customerOrderQuery.delete(customer_id, date);

    // console.log("Controller: addresses ", response)

    if (response.rowCount === 0) {
      res.status(404).json({
        status: "error",
        message: `customer order with customer_id=${customer_id} and date=${date} not found`,
      });
    } else {
      res.status(200).json({
        status: "ok",

        message: `customer order with customer_id=${customer_id} and date=${date} deleted`,
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
