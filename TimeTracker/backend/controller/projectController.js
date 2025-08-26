const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  const { name, description } = req.body;
  const project = new Project({
    name,
    description,
    userId: req.session.userId,
  });
  await project.save();
  res.status(201).json(project);
};

exports.getProjects = async (req, res) => {
  const projects = await Project.find({ userId: req.session.userId });
  res.json(projects);
};

exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const updated = await Project.findOneAndUpdate(
    { _id: id, userId: req.session.userId },
    req.body,
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: "Project not found" });
  res.json(updated);
};

exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  const deleted = await Project.findOneAndDelete({
    _id: id,
    userId: req.session.userId,
  });
  if (!deleted) return res.status(404).json({ message: "Project not found" });
  res.json({ message: "Deleted successfully" });
};
