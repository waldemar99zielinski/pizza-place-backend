const express = require("express");
const ordersController = require("./../controllers/orders");

const router = express.Router();

router.route("/").get(ordersController.getAll).post(ordersController.create);
router
  .route("/:customer_id/:date")
  .get(ordersController.getOne)
  .delete(ordersController.delete);

module.exports = router;
