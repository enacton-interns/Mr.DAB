const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: "Provider" },
  serviceType: String,
  status: {
    type: String,
    enum: ["active", "completed", "cancelled"],
    default: "active",
  },
  requestedAt: { type: Date, default: Date.now },
  scheduledAt: Date,
  isRecurring: { type: Boolean, default: false },
  recurringDetails: {
    frequency: String, // e.g., 'weekly', 'monthly'
    interval: Number, // e.g., every 2 weeks
    endDate: Date,
  },
  feedback: {
    rating: Number,
    comment: String,
  },
});

module.exports = mongoose.model("Request", requestSchema);
