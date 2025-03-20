const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true
  },
  redirectURL: {
    type: String,
    required: true
  },
  visiteHistory: [{timestamp: {type:Number}}],
  expirationDate: {
    type: Date,
    default: null
  }
}, 
{timestamps: true}
);

const URL = mongoose.model('URL', urlSchema);

module.exports = URL;
