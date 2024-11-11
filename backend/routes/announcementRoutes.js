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

router.delete('/:id', async (req, res) => {
    try {
        const announcementId = req.params.id;
        const deletedAnnouncement = await Announcement.findByIdAndDelete(announcementId);
        
        if (!deletedAnnouncement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }

        res.status(200).json({ message: 'Announcement deleted successfully' });
    } catch (error) {
        console.error('Error deleting announcement:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
