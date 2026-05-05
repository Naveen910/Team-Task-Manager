// routes/projectRoutes.js
const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

const {
  createProject,
  getProjects,
  getProjectById,
  addMembers,
  removeMember
} = require("../controllers/projectController");

// =========================
// 🔹 Project Core Routes
// =========================

// Get all projects
router.get("/", auth, getProjects);

// Get single project
router.get("/:id", auth, getProjectById);

// Create project (Admin only)
router.post("/", auth, isAdmin, createProject);

// =========================
// 🔹 Member Management
// =========================

// Add members
router.post("/:id/members", auth, isAdmin, addMembers);

// Remove member
router.delete("/:id/members/:userId", auth, isAdmin, removeMember);

module.exports = router;