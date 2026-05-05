const Task = require("../models/Task");
const Project = require("../models/Project");

// ✅ Create Task
exports.createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      projectId,
      assignedTo,
      dueDate,
      priority
    } = req.body;

    // 🔴 Validation
    if (!title || !projectId) {
      return res.status(400).json({ msg: "Title and Project are required" });
    }

    // 🔍 Check project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    // 🔐 Check membership (FIXED)
    const isMember = project.members.some(
      m => m.toString() === req.user.id
    );

    if (!isMember) {
      return res.status(403).json({
        msg: "You are not a member of this project"
      });
    }

    // ✅ Create task
    const task = await Task.create({
      title,
      description: description || "",
      projectId,
      assignedTo: assignedTo || req.user.id,
      dueDate,
      priority: priority || "Medium"
    });

    // 🔄 Populate response
    const populatedTask = await Task.findById(task._id)
      .populate("assignedTo", "name email")
      .populate("projectId", "name");

    res.status(201).json(populatedTask);

  } catch (err) {
    console.error("CREATE TASK ERROR:", err); // 🔥 IMPORTANT
    res.status(500).json({ msg: err.message });
  }
};


// ✅ Get My Tasks
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
    console.error("GET TASKS ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};


// ✅ Update Task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate("assignedTo", "name email")
      .populate("projectId", "name");

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json(task);

  } catch (err) {
    console.error("UPDATE TASK ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};


// ✅ Get Tasks by Project
exports.getProjectTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    const tasks = await Task.find({ projectId })
      .populate("assignedTo", "name email")
      .populate("projectId", "name")
      .sort({ createdAt: -1 });

    res.json(tasks);

  } catch (err) {
    console.error("GET PROJECT TASKS ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};