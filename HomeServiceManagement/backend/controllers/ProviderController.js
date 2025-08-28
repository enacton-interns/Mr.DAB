const Provider = require("../models/Provider");

// Create a provider
exports.createProvider = async (req, res) => {
  try {
    const { name, skills, availability } = req.body;
    const provider = new Provider({ name, skills, availability });
    await provider.save();
    res.status(201).json(provider);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all providers (optionally filter by skill)
exports.getProviders = async (req, res) => {
  try {
    const skill = req.query.skill;
    let query = {};
    if (skill) {
      query.skills = skill;
    }
    const providers = await Provider.find(query);
    res.json(providers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a provider by ID
exports.getProviderById = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);
    if (!provider) return res.status(404).json({ error: "Provider not found" });
    res.json(provider);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update provider by ID
exports.updateProvider = async (req, res) => {
  try {
    const { name, skills, availability } = req.body;
    const provider = await Provider.findByIdAndUpdate(
      req.params.id,
      { name, skills, availability },
      { new: true }
    );
    if (!provider) return res.status(404).json({ error: "Provider not found" });
    res.json(provider);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete provider by ID
exports.deleteProvider = async (req, res) => {
  try {
    const provider = await Provider.findByIdAndDelete(req.params.id);
    if (!provider) return res.status(404).json({ error: "Provider not found" });
    res.json({ message: "Provider deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
