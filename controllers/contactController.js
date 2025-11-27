const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
  }
});

exports.submitContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();

    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to: process.env.NODEMAILER_USER,
      subject: 'Yeni Mesaj - INNOHUB',
      html: `
        <h2>Yeni Mesaj</h2>
        <p><strong>Ad:</strong> ${contact.name}</p>
        <p><strong>Telefon:</strong> ${contact.phone}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Mesaj:</strong> ${contact.message}</p>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error('Email göndərmə xətası:', emailError);
    }

    res.status(201).json({ message: 'Mesaj uğurla göndərildi', contact });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

