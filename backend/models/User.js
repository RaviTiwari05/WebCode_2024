
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  profession: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
module.exports = mongoose.model('User', userSchema);
