const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Project name is required"],
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  startDate: Date,
  endDate: Date,
  status: {
    type: String,
    enum: ["Active", "Completed", "Archived"],
    default: "Active"
  }
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);