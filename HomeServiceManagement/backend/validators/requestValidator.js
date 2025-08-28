const { body } = require("express-validator");
const mongoose = require("mongoose");

exports.createRequestValidator = [
  body("customerId")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid customerId"),
  body("providerId")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid providerId"),
  body("serviceType").notEmpty().withMessage("Service type is required"),
  body("scheduledAt")
    .isISO8601()
    .withMessage("Invalid scheduledAt date format"),
  body("isRecurring")
    .isBoolean()
    .withMessage("isRecurring must be true or false"),
];

exports.updateRequestValidator = [
  body("customerId")
    .optional()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid customerId"),
  body("providerId")
    .optional()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid providerId"),
  body("serviceType")
    .optional()
    .notEmpty()
    .withMessage("Service type cannot be empty"),
  body("scheduledAt")
    .optional()
    .isISO8601()
    .withMessage("Invalid scheduledAt date format"),
  body("isRecurring")
    .optional()
    .isBoolean()
    .withMessage("isRecurring must be true or false"),
];
