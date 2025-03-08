const mongoose = require("mongoose");

const registrationRequestSchema = new mongoose.Schema({
  email: { type: String, required: true },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model(
  "registrationRequest",
  registrationRequestSchema,
);
