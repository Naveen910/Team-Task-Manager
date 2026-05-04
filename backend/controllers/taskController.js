const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { createTask, updateTask, getTasks } = require("../controllers/taskController");

router.post("/", auth, createTask);
router.patch("/:id", auth, updateTask);
router.get("/", auth, getTasks);

module.exports = router;