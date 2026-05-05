const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

const {
  addMembers,
  removeMember
} = require("../controllers/projectController");

// add/remove members
router.post("/:id/members", auth, isAdmin, addMembers);
router.delete("/:id/members/:userId", auth, isAdmin, removeMember);

module.exports = router;