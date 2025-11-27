const mongoose = require('mongoose');

const graduateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  field: {
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

module.exports = mongoose.model('Graduate', graduateSchema);

