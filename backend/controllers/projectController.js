const Project = require("../models/Project");
const User = require("../models/User");

// ✅ Add members to project
exports.addMembers = async (req, res) => {
  try {
    const { members } = req.body;

    // validate users
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