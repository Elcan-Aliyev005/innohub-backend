const Course = require('../models/Course');
const CourseApplication = require('../models/CourseApplication');

exports.getAllCourses = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const courses = await Course.find(filter).sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Kurs tapılmadı' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const courseData = { ...req.body };
    if (req.file) {
      courseData.image = req.file.path;
    }
    const course = new Course(courseData);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const courseData = { ...req.body };
    if (req.file) {
      courseData.image = req.file.path;
    }
    const course = await Course.findByIdAndUpdate(req.params.id, courseData, { new: true, runValidators: true });
    if (!course) {
      return res.status(404).json({ message: 'Kurs tapılmadı' });
    }
    res.json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Kurs tapılmadı' });
    }
    res.json({ message: 'Kurs silindi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.applyForCourse = async (req, res) => {
  try {
    const application = new CourseApplication({
      courseId: req.params.id,
      ...req.body
    });
    await application.save();
    res.status(201).json({ message: 'Müraciət uğurla göndərildi', application });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

