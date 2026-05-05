const Project = require("../models/Project");
const User = require("../models/User");

// ✅ Create Project
exports.createProject = async (req, res) => {
  try {
    const { name, description, members = [] } = req.body;

    // 🔴 Validation
    if (!name) {
      return res.status(400).json({ msg: "Project name is required" });
    }

    // ✅ Validate users
    const validUsers = await User.find({ _id: { $in: members } });

    // ✅ Merge + remove duplicates
    const allMembers = [
      req.user.id,
      ...validUsers.map(u => u._id.toString())
    ];

    const uniqueMembers = [...new Set(allMembers)];

    const project = await Project.create({
      name,
      description: description || "",
      members: uniqueMembers,
      createdBy: req.user.id  
    });

    res.status(201).json(project);

  } catch (err) {
    console.error("CREATE PROJECT ERROR:", err); // 🔥 IMPORTANT
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
    console.error("GET PROJECTS ERROR:", err);
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
    console.error("GET PROJECT BY ID ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};


// ✅ Add members
exports.addMembers = async (req, res) => {
  try {
    const { members = [] } = req.body;

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    const validUsers = await User.find({ _id: { $in: members } });

    if (validUsers.length !== members.length) {
      return res.status(400).json({ msg: "Invalid users provided" });
    }

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
    console.error("ADD MEMBERS ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};


// ✅ Remove member
exports.removeMember = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    project.members = project.members.filter(
      m => m.toString() !== req.params.userId
    );

    await project.save();

    res.json(project);

  } catch (err) {
    console.error("REMOVE MEMBER ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};