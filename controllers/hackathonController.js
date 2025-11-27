const Hackathon = require('../models/Hackathon');
const HackathonRegistration = require('../models/HackathonRegistration');

exports.getPastHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.find({ type: 'past' }).sort({ date: -1 });
    res.json(hackathons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFutureHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.find({ type: 'future' }).sort({ date: 1 });
    res.json(hackathons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createHackathon = async (req, res) => {
  try {
    const hackathonData = { ...req.body };
    if (req.file) {
      hackathonData.image = req.file.path;
    }
    const hackathon = new Hackathon(hackathonData);
    await hackathon.save();
    res.status(201).json(hackathon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateHackathon = async (req, res) => {
  try {
    const hackathonData = { ...req.body };
    if (req.file) {
      hackathonData.image = req.file.path;
    }
    const hackathon = await Hackathon.findByIdAndUpdate(req.params.id, hackathonData, { new: true, runValidators: true });
    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon tapılmadı' });
    }
    res.json(hackathon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteHackathon = async (req, res) => {
  try {
    const hackathon = await Hackathon.findByIdAndDelete(req.params.id);
    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon tapılmadı' });
    }
    res.json({ message: 'Hackathon silindi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.registerForHackathon = async (req, res) => {
  try {
    const registration = new HackathonRegistration({
      hackathonId: req.params.id,
      ...req.body
    });
    await registration.save();
    res.status(201).json({ message: 'Qeydiyyat uğurla tamamlandı', registration });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

