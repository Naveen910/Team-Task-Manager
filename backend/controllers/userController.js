const User = require("../models/User");
const Project = require("../models/Project");
const bcrypt = require("bcryptjs");

// ✅ Get all users (Admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "name email role")
      .sort({ name: 1 });

    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Get project members
exports.getProjectMembers = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId)
      .populate("members", "name email role");

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    res.json(project.members);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Create user (Admin)
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role || "Member"
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Delete user
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "User deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Update user role
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};