const axios = require("axios");
const { expectCt } = require("helmet");

const { apiURL } = require("../confing");

const testPizza = {
  pizza_code: "TEST1",
  name: "Havaian",
  description: "desc",
  price_small: "550",
  price_big: "1450",
  image: "https://test.com",
};
const testPizza2 = {
  pizza_code: "TEST2",
  name: "Havaian",
  description: "desc",
  price_small: "450",
  price_big: "1650",
  image: "https://test.com",
};
const testPizza3 = {
  pizza_code: "TEST3",
  name: "Havaian",
  description: "desc",
  price_small: "650",
  price_big: "1750",
  image: "https://test.com",
};

describe("Controller: order", () => {
  beforeAll(async () => {
    await axios.post(`${apiURL}/pizzas`, testPizza);
    await axios.post(`${apiURL}/pizzas`, testPizza2);
    await axios.post(`${apiURL}/pizzas`, testPizza3);
  });
  afterAll(async () => {
    await axios.delete(`${apiURL}/pizzas/${testPizza.pizza_code}`);
    await axios.delete(`${apiURL}/pizzas/${testPizza2.pizza_code}`);
    await axios.delete(`${apiURL}/pizzas/${testPizza3.pizza_code}`);
  });

  test("create: with one pizza", async () => {
    const response = await axios.post(`${apiURL}/orders`, {
      customer: {
        name: "name",
        phone: "123123123",
      },
      order: {
        delivery: "Y",
        payment: "R",
      },
      address: {
        city: "wwa",
        street: "b",
        street_number: 1,
        apartment_number: 2,
      },

      pizzas_to_order: [
        {
          pizza_code: testPizza.pizza_code,
          extra_topping_code: null,
          size: "S",
        },
      ],
    });
    console.log(response);
    const order = response.data.data;
    expect(response.status).toEqual(201);
    expect(order.total_price).toEqual(testPizza.price_small);

    await axios.delete(`${apiURL}/orders/${order.customer_id}/${order.date}`);
    // const order = response.data.data
  });
});
