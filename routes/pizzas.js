const express = require("express");
const pizzaController = require("../controllers/pizzas");

const router = express.Router();

router.route("/").get(pizzaController.getAll);
// router.route("/:id").get(discountController.getOneDiscount);

module.exports = router;
