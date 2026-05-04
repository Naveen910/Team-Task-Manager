const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  try {
    const { name, description, members, startDate, endDate } = req.body;

    const project = await Project.create({
      name,
      description,
      createdBy: req.user.id,
      members: members || [req.user.id], // Creator is automatically a member
      startDate,
      endDate
    });

    const populated = await Project.findById(project._id)
      .populate("createdBy", "name email")
      .populate("members", "name email");

    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user.id
    })
    .populate("createdBy", "name email")
    .populate("members", "name email")
    .sort({ createdAt: -1 });

    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("members", "name email");

    if (!project) return res.status(404).json({ msg: "Project not found" });

    // Check if user is member
    if (!project.members.some(m => m._id.toString() === req.user.id)) {
      return res.status(403).json({ msg: "Access denied" });
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};