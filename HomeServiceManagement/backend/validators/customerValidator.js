const { body } = require("express-validator");

exports.createCustomerValidator = [
  body("name").notEmpty().withMessage("Customer name is required"),
  body("contact").isEmail().withMessage("Valid email is required"),
  body("phone").isMobilePhone().withMessage("Valid phone number is required"),
];

exports.updateCustomerValidator = [
  body("name")
    .optional()
    .notEmpty()
    .withMessage("Customer name cannot be empty"),
  body("email").optional().isEmail().withMessage("Must be a valid email"),
  body("phone")
    .optional()
    .isMobilePhone()
    .withMessage("Must be a valid phone number"),
];
