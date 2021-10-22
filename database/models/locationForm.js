const mongoose = require('mongoose');


const locationSchema = mongoose.Schema({
  Name: String,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  Email: String,
  Picture: [String],
  isBusiness: Boolean,
  Link: String,
  phoneNumber: Number,
  Description: String,
  covidInfo: String
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;