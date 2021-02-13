const express = require("express");

const router = express.Router();

const passportConfig = require("../authentication/passportConfig");

router.route("/").get(discountController.getAllDiscounts);
router.route("/:id").get(discountController.getOneDiscount);

module.exports = router;
