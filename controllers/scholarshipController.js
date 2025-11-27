const Scholarship = require('../models/Scholarship');

exports.getAllScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarship.find().sort({ createdAt: -1 });
    res.json(scholarships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createScholarship = async (req, res) => {
  try {
    const scholarshipData = { ...req.body };
    if (req.file) {
      scholarshipData.image = req.file.path;
    }
    const scholarship = new Scholarship(scholarshipData);
    await scholarship.save();
    res.status(201).json(scholarship);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateScholarship = async (req, res) => {
  try {
    const scholarshipData = { ...req.body };
    if (req.file) {
      scholarshipData.image = req.file.path;
    }
    const scholarship = await Scholarship.findByIdAndUpdate(req.params.id, scholarshipData, { new: true, runValidators: true });
    if (!scholarship) {
      return res.status(404).json({ message: 'Təqaüd tapılmadı' });
    }
    res.json(scholarship);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteScholarship = async (req, res) => {
  try {
    const scholarship = await Scholarship.findByIdAndDelete(req.params.id);
    if (!scholarship) {
      return res.status(404).json({ message: 'Təqaüd tapılmadı' });
    }
    res.json({ message: 'Təqaüd silindi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

