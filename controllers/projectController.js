const Project = require('../models/Project');

exports.getPastProjects = async (req, res) => {
  try {
    const projects = await Project.find({ type: 'past' }).sort({ date: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFutureProjects = async (req, res) => {
  try {
    const projects = await Project.find({ type: 'future' }).sort({ date: 1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const projectData = { ...req.body };
    if (req.file) {
      projectData.image = req.file.path;
    }
    const project = new Project(projectData);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const projectData = { ...req.body };
    if (req.file) {
      projectData.image = req.file.path;
    }
    const project = await Project.findByIdAndUpdate(req.params.id, projectData, { new: true, runValidators: true });
    if (!project) {
      return res.status(404).json({ message: 'Layihə tapılmadı' });
    }
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Layihə tapılmadı' });
    }
    res.json({ message: 'Layihə silindi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

