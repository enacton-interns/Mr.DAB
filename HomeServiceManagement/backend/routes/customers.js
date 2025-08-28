const express = require("express");
const router = express.Router();
const customerController = require("../controllers/CustomerController");
const {
  createCustomerValidator,
  updateCustomerValidator,
} = require("../validators/customerValidator");
const validate = require("../middlewares/validate");

router.post(
  "/",
  createCustomerValidator,
  validate,
  customerController.createCustomer
);
router.get("/", customerController.getCustomers);
router.get("/:id", customerController.getCustomerById);
router.put(
  "/:id",
  updateCustomerValidator,
  validate,
  customerController.updateCustomer
);
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
