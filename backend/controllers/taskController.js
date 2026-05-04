const Task = require("../models/Task");
const Project = require("../models/Project");

exports.createTask = async (req, res) => {
  try {
    const { title, description, projectId, assignedTo, dueDate, priority } = req.body;

    // Verify user has access to project
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ msg: "Project not found" });
    if (!project.members.includes(req.user.id)) {
      return res.status(403).json({ msg: "You are not a member of this project" });
    }

    const task = await Task.create({
      title,
      description,
      projectId,
      assignedTo: assignedTo || req.user.id,
      dueDate,
      priority
    });

    const populatedTask = await Task.findById(task._id)
      .populate("assignedTo", "name email")
      .populate("projectId", "name");

    res.status(201).json(populatedTask);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      assignedTo: req.user.id
    })
    .populate("projectId", "name")
    .populate("assignedTo", "name email")
    .sort({ dueDate: 1 });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("assignedTo", "name email")
     .populate("projectId", "name");

    if (!task) return res.status(404).json({ msg: "Task not found" });

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getProjectTasks = async (req, res) => {
  try {
    const { projectId } = req.params;
    const tasks = await Task.find({ projectId })
      .populate("assignedTo", "name email")
      .populate("projectId", "name")
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};