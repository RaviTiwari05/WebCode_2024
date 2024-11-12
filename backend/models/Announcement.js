
const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    text: { type: String, required: true },
    userName: { type: String, required: true },
    department: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Announcement', announcementSchema);
