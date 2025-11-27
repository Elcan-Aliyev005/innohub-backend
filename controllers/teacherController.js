const Teacher = require('../models/Teacher');

exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTeacher = async (req, res) => {
  try {
    const teacherData = { ...req.body };
    if (req.file) {
      teacherData.image = req.file.path;
    }
    const teacher = new Teacher(teacherData);
    await teacher.save();
    res.status(201).json(teacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTeacher = async (req, res) => {
  try {
    const teacherData = { ...req.body };
    if (req.file) {
      teacherData.image = req.file.path;
    }
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, teacherData, { new: true, runValidators: true });
    if (!teacher) {
      return res.status(404).json({ message: 'Müəllim tapılmadı' });
    }
    res.json(teacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Müəllim tapılmadı' });
    }
    res.json({ message: 'Müəllim silindi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

