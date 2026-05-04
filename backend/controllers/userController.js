const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "name email role")
      .sort({ name: 1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getProjectMembers = async (req, res) => {
  try {
    const project = await require("../models/Project")
      .findById(req.params.projectId)
      .populate("members", "name email role");

    if (!project) return res.status(404).json({ msg: "Project not found" });

    res.json(project.members);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};