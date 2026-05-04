const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const {
  createTask,
  updateTask,
  getTasks,
  getProjectTasks
} = require("../controllers/taskController");

router.post("/", auth, createTask);
router.patch("/:id", auth, updateTask);
router.get("/", auth, getTasks);
router.get("/project/:projectId", auth, getProjectTasks);

module.exports = router;