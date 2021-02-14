const express = require("express");
const pizzaController = require("../controllers/pizzas");

const router = express.Router();

router.route("/").get(pizzaController.getAll).post(pizzaController.create);
router.route("/:id").get(pizzaController.getOne);

module.exports = router;
