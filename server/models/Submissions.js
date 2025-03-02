const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  riddleId: { type: String, required: true },
  submissionLink: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  approved: { type: Boolean, default: null },
});

module.exports = mongoose.model("Submission", submissionSchema);
