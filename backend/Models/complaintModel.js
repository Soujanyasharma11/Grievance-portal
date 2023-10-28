const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  complaintText: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: [Number], // Use an array to store coordinates [longitude, latitude]
    index: '2dsphere', // Create a geospatial index for geolocation queries
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel', // Replace with the actual User model name
    
  },
  attachment: {
    type: String,
  },
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
