const mongoose = require("mongoose");

const ProcessSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  subtopic: [
    {
      subtopic: {
        type: String,
        required: true,
      },
      activities: {
        type: String,
        // default: "NA",
      },
      request: {
        type: String,
        // default: "NA",
      },
      approval: {
        approval_pp8: {
          type: String,
          // default: "NA",
        },
        approval_tp8: {
          type: String,
          // default: "NA",
        },
      },
      sod: {
        sod_pp8: {
          type: String,
          // default: "NA",
        },
        sod_tp8: {
          type: String,
          // default: "NA",
        },
      },
      basis_critical_approval: {
        type: String,
        // default: "NA",
      },
      comments: {
        type: String,
        // default: "NA",
      },
    },
  ],
});

const Process = mongoose.model("Process", ProcessSchema);

module.exports = Process;
