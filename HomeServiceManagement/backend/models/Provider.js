const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  skills: [String],
  availability: [Boolean], // Simplified; you can improve later
  rating: { type: Number, default: 0 },
});

module.exports = mongoose.model("Provider", providerSchema);
