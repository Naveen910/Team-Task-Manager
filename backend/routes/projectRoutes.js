const router = require("express").Router();

const auth = require("../middleware/AuthMiddleware");
const { isAdmin } = require("../middleware/RoleMiddleware");

const {
  createProject,
  getProjects
} = require("../controllers/projectController");

router.post("/", auth, isAdmin, createProject);
router.get("/", auth, getProjects);

module.exports = router;