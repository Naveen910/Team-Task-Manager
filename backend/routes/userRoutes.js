const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const { getAllUsers, getProjectMembers } = require("../controllers/userController");

router.get("/", auth, getAllUsers);
router.get("/project/:projectId", auth, getProjectMembers);

module.exports = router;