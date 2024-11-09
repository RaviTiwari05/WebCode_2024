// announcements.js
const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');
const authMiddleware = require('../middleware/authMiddleware');

// Route to create a new announcement
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { text } = req.body;
        const { userName, department } = req.user; // Retrieve userName and department from authMiddleware

        const announcement = new Announcement({
            text,
            userName,
            department
        });

        await announcement.save();
        res.status(201).json(announcement); // Send the new announcement as response
    } catch (error) {
        res.status(500).json({ message: 'Failed to create announcement' });
    }
});

// Route to get all announcements
router.get('/', authMiddleware, async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ createdAt: -1 });
        res.json(announcements);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch announcements' });
    }
});

module.exports = router;
