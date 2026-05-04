const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");
const { createProject, getProjects } = require("../controllers/projectController");

router.post("/", auth, isAdmin, createProject);
router.get("/", auth, getProjects);

module.exports = router;