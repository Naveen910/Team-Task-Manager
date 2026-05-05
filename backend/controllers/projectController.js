const Project = require("../models/Project");
const User = require("../models/User");

// ✅ Create Project
exports.createProject = async (req, res) => {
  try {
    const { name, description, members } = req.body;

    const validUsers = await User.find({ _id: { $in: members || [] } });

    const project = await Project.create({
      name,
      description,
      members: [
        req.user.id,
        ...validUsers.map(u => u._id)
      ]
    });

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user.id
    }).populate("members", "name email role");

    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Get project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("members", "name email role");

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Add members
exports.addMembers = async (req, res) => {
  try {
    const { members } = req.body;

    const validUsers = await User.find({ _id: { $in: members } });

    if (validUsers.length !== members.length) {
      return res.status(400).json({ msg: "Invalid users provided" });
    }

    const project = await Project.findById(req.params.id);

    const updatedMembers = [
      ...new Set([
        ...project.members.map(m => m.toString()),
        ...members
      ])
    ];

    project.members = updatedMembers;
    await project.save();

    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Remove member
exports.removeMember = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    project.members = project.members.filter(
      m => m.toString() !== req.params.userId
    );

    await project.save();

    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};