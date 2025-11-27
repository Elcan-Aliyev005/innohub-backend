const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  linkedin: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Teacher', teacherSchema);

