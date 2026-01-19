const Event = require('../models/Event');
const EventRegistration = require('../models/EventRegistration');

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Tədbir tapılmadı' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const eventData = { ...req.body };
    if (req.file) {
      eventData.image = req.file.path;
    }
    const event = new Event(eventData);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const eventData = { ...req.body };
    if (req.file) {
      eventData.image = req.file.path;
    }
    const event = await Event.findByIdAndUpdate(req.params.id, eventData, { new: true, runValidators: true });
    if (!event) {
      return res.status(404).json({ message: 'Tədbir tapılmadı' });
    }
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Tədbir tapılmadı' });
    }
    res.json({ message: 'Tədbir silindi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.registerForEvent = async (req, res) => {
  try {
    const registration = new EventRegistration({
      eventId: req.params.id,
      ...req.body
    });
    await registration.save();
    res.status(201).json({ message: 'Qeydiyyat uğurla tamamlandı', registration });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllEventRegistrations = async (req, res) => {
  try {
    const registrations = await EventRegistration.find().populate('eventId').sort({ createdAt: -1 });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
