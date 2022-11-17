const mongoose = require('mongoose');

// All the reports in the application
const reportSchema = new mongoose.Schema({
  username: { type: 'string', required: true },
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
  totlalReviews: { type: Number, required: true },
  language: [{ type: String, required: true }],
  sementic: {
    Positive: { type: Number, default: 0 },
    Negative: { type: Number, default: 0 },
    Neutral: { type: Number, default: 0 },
  },
  predictResult: {
    suspected: { type: Number, default: 0 },
    not_suspected: { type: Number, default: 0 },
  },
  vpResult: {
    users: { type: Number, default: 0 },
    vp: { type: Number, default: 0 },
    non_vp: { type: Number, default: 0 },
  },
});
module.exports =
  mongoose.models.report || mongoose.model('report', reportSchema);
