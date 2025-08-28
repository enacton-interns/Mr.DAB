const Request = require("../models/Request");
const Customer = require("../models/Customer");

exports.createRequest = async (req, res) => {
  try {
    const {
      customerId,
      serviceType,
      providerId,
      scheduledAt,
      isRecurring,
      recurringDetails,
    } = req.body;

    const request = new Request({
      customerId,
      serviceType,
      providerId,
      status: "active",
      requestedAt: new Date(),
      scheduledAt,
      isRecurring,
      recurringDetails,
    });

    await request.save();

    // Add this request to the customer's service history
    await Customer.findByIdAndUpdate(customerId, {
      $push: { serviceHistory: request._id },
    });

    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRequests = async (req, res) => {
  try {
    const requests = await Request.find()
      .populate("customerId", "name contact")
      .populate("providerId", "name skills");
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id)
      .populate("customerId", "name contact")
      .populate("providerId", "name skills");
    if (!request) return res.status(404).json({ error: "Request not found" });
    res.json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRequest = async (req, res) => {
  try {
    const { status, providerId, feedback, scheduledAt } = req.body;
    const updateData = { status, scheduledAt };
    if (providerId) updateData.providerId = providerId;
    if (feedback) updateData.feedback = feedback;

    const request = await Request.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!request) return res.status(404).json({ error: "Request not found" });
    res.json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndDelete(req.params.id);
    if (!request) return res.status(404).json({ error: "Request not found" });
    res.json({ message: "Request deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
