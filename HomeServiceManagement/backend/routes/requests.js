const express = require("express");
const router = express.Router();
const requestController = require("../controllers/RequestController");
const {
  createRequestValidator,
  updateRequestValidator,
} = require("../validators/requestValidator");
const validate = require("../middlewares/validate");

router.post(
  "/",
  createRequestValidator,
  validate,
  requestController.createRequest
);
router.get("/", requestController.getRequests);
router.get("/:id", requestController.getRequestById);
router.put(
  "/:id",
  updateRequestValidator,
  validate,
  requestController.updateRequest
);
router.delete("/:id", requestController.deleteRequest);

module.exports = router;
