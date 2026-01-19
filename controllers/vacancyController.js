const Vacancy = require('../models/Vacancy');

exports.getAllVacancies = async (req, res) => {
  try {
    const vacancies = await Vacancy.find().sort({ order: 1, createdAt: -1 });
    res.json(vacancies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVacancyById = async (req, res) => {
  try {
    const vacancy = await Vacancy.findById(req.params.id);
    if (!vacancy) {
      return res.status(404).json({ message: 'Vakansiya tapılmadı' });
    }
    res.json(vacancy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createVacancy = async (req, res) => {
  try {
    const vacancyData = { ...req.body };
    if (req.file) {
      vacancyData.image = req.file.path;
    }
    const vacancy = new Vacancy(vacancyData);
    await vacancy.save();
    res.status(201).json(vacancy);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateVacancy = async (req, res) => {
  try {
    const vacancyData = { ...req.body };
    if (req.file) {
      vacancyData.image = req.file.path;
    }
    const vacancy = await Vacancy.findByIdAndUpdate(req.params.id, vacancyData, { new: true, runValidators: true });
    if (!vacancy) {
      return res.status(404).json({ message: 'Vakansiya tapılmadı' });
    }
    res.json(vacancy);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteVacancy = async (req, res) => {
  try {
    const vacancy = await Vacancy.findByIdAndDelete(req.params.id);
    if (!vacancy) {
      return res.status(404).json({ message: 'Vakansiya tapılmadı' });
    }
    res.json({ message: 'Vakansiya silindi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
