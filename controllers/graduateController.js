const Graduate = require('../models/Graduate');

exports.getAllGraduates = async (req, res) => {
  try {
    const graduates = await Graduate.find();
    res.json(graduates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createGraduate = async (req, res) => {
  try {
    const graduateData = { ...req.body };
    if (req.file) {
      graduateData.image = req.file.path;
    }
    const graduate = new Graduate(graduateData);
    await graduate.save();
    res.status(201).json(graduate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteGraduate = async (req, res) => {
  try {
    const graduate = await Graduate.findByIdAndDelete(req.params.id);
    if (!graduate) {
      return res.status(404).json({ message: 'Məzun tapılmadı' });
    }
    res.json({ message: 'Məzun silindi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

