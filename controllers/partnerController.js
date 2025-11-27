const Partner = require('../models/Partner');

exports.getAllPartners = async (req, res) => {
  try {
    const partners = await Partner.find();
    res.json(partners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPartner = async (req, res) => {
  try {
    const partnerData = { ...req.body };
    if (req.file) {
      partnerData.logo = req.file.path;
    }
    const partner = new Partner(partnerData);
    await partner.save();
    res.status(201).json(partner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePartner = async (req, res) => {
  try {
    const partner = await Partner.findByIdAndDelete(req.params.id);
    if (!partner) {
      return res.status(404).json({ message: 'Tərəfdaş tapılmadı' });
    }
    res.json({ message: 'Tərəfdaş silindi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

