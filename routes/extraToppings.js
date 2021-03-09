const express = require("express");
const extraToppingsController = require("./../controllers/extraToppings");

const router = express.Router();

router
  .route("/")
  .get(extraToppingsController.getAll)
  .post(extraToppingsController.create);
router
  .route("/:id")
  .get(extraToppingsController.getOne)
  .delete(extraToppingsController.delete);

module.exports = router;
