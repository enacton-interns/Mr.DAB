const express = require("express");
const router = express.Router();
const providerController = require("../controllers/ProviderController");
const {
  createProviderValidator,
  updateProviderValidator,
} = require("../validators/providerValidator");
const validate = require("../middlewares/validate");

router.post(
  "/",
  createProviderValidator,
  validate,
  providerController.createProvider
);
router.get("/", providerController.getProviders);
router.get("/:id", providerController.getProviderById);
router.put(
  "/:id",
  updateProviderValidator,
  validate,
  providerController.updateProvider
);
router.delete("/:id", providerController.deleteProvider);

module.exports = router;
