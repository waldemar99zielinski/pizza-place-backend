const express = require("express");
const customerController = require("./../controllers/customers");

const router = express.Router();

router
  .route("/")
  .get(customerController.getAll)
  .post(customerController.create);
router
  .route("/:id")
  .get(customerController.getOne)
  .delete(customerController.delete);

module.exports = router;
