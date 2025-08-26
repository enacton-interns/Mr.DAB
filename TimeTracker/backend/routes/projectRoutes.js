const express = require("express");
const router = express.Router();
const projectController = require("../controller/projectController");
const { requireAuth } = require("../middleware/authMiddleware");

router.use(requireAuth);

router.post("/", projectController.createProject);
router.get("/", projectController.getProjects);
router.put("/:id", projectController.updateProject);
router.delete("/:id", projectController.deleteProject);

module.exports = router;
