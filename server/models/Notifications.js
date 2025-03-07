const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  type: { type: String, required: true },
  payload: {
    decision: { type: String, enum: ["approve", "disapprove"], required: true },
    submissionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Submission",
      required: true,
    },
  },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

notificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 });

module.exports = mongoose.model("Notification", notificationSchema);
