const express = require("express");
const addressController = require("./../controllers/addresses");

const router = express.Router();

router.route("/").get(addressController.getAll).post(addressController.create);
router
  .route("/:id")
  .get(addressController.getOne)
  .delete(addressController.delete);

module.exports = router;
