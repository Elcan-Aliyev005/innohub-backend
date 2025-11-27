const CareerConsulting = require('../models/CareerConsulting');

exports.apply = async (req, res) => {
  try {
    const application = new CareerConsulting(req.body);
    await application.save();
    res.status(201).json({ message: 'Müraciət uğurla göndərildi', application });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

