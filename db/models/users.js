const mongoose = require('mongoose');

// All the registered users in the application
const usersSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true },
  Username: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Profile: {
    bio: { type: String, default: 'Lorem ispum dolor sit amet, consectetur' },
    reportId: [{ type: String }],
    image: { type: String, required: false, default: 'default.png' },
  },
});
module.exports =
  mongoose.models.people || mongoose.model('people', usersSchema);
