const mongoose = require("mongoose");

const resetPasswordRequest = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      match: [/.+@.+\..+/, "Please enter a valid email"],
    },
    token: {
      type: String,
      required: true,
    },
    resetLink: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

const ResetPasswordRequest = mongoose.model(
  "resetPasswordRequest",
  resetPasswordRequest,
);
module.exports = ResetPasswordRequest;
