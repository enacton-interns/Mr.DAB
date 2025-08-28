const { body } = require("express-validator");

exports.createProviderValidator = [
  body("name").notEmpty().withMessage("Provider name is required"),
  body("skills")
    .isArray({ min: 1 })
    .withMessage("Skills must be an array with at least one skill"),
  body("availability")
    .isBoolean()
    .withMessage("Availability must be true or false"),
];

exports.updateProviderValidator = [
  body("name")
    .optional()
    .notEmpty()
    .withMessage("Provider name cannot be empty"),
  body("skills")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Skills must be an array with at least one skill"),
  body("availability")
    .optional()
    .isBoolean()
    .withMessage("Availability must be true or false"),
];
