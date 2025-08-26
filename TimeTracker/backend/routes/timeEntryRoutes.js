const express = require("express");
const router = express.Router();
const timeEntryController = require("../controller/timeEntryController");
const { requireAuth } = require("../middleware/authMiddleware");

router.use(requireAuth);

router.get("/", timeEntryController.getAllTimeEntries);
router.get("/summary", timeEntryController.getSummary);
router.get("/exports", timeEntryController.exportTimeEntries);
router.get("/:projectId", timeEntryController.getTimeEntriesForProject);
router.post("/", timeEntryController.logTime);
router.put("/:id", timeEntryController.updateTimeEntry);
router.delete("/:id", timeEntryController.deleteTimeEntry);

module.exports = router;
