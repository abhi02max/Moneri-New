const mongoose = require('mongoose');

const GalleryImageSchema = new mongoose.Schema({
  tagline: {
    type: String,
    // required: true, // We are changing this
    required: false, // Make the tagline optional
  },
  imageUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('GalleryImage', GalleryImageSchema);