const axios = require("axios");
const { expectCt } = require("helmet");

const { apiURL } = require("../confing");

const testPizza = {
  pizza_code: "TEST",
  name: "Havaian",
  description: "desc",
  price_small: "550",
  price_big: "1450",
  image: "https://test.com",
};

describe("Controller: pizza", () => {
  beforeAll(async () => {
    await axios.post(`${apiURL}/pizzas`, testPizza);
  });
  afterAll(async () => {
    await axios.delete(`${apiURL}/pizzas/TEST`);
  });

  test("getAll: should return array of pizzas", async () => {
    const response = await axios.get(`${apiURL}/pizzas`);
    const pizzas = response.data.data;
    // console.log(response);

    expect(response.status).toEqual(200);
    expect(pizzas).toEqual(expect.any(Array));
  });

  test("getOne", async () => {
    const response = await axios.get(`${apiURL}/pizzas/TEST`);
    const pizza = response.data.data;
    console.log(response);
    expect(pizza).toStrictEqual(testPizza);
  });
});
