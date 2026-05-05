const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

const {
  getAllUsers,
  getProjectMembers,
  createUser,
  deleteUser,
  updateUserRole
} = require("../controllers/userController");

// Admin routes
router.get("/", auth, isAdmin, getAllUsers);
router.post("/", auth, isAdmin, createUser);
router.delete("/:id", auth, isAdmin, deleteUser);
router.patch("/:id/role", auth, isAdmin, updateUserRole);

// Project members
router.get("/project/:projectId", auth, getProjectMembers);

module.exports = router;