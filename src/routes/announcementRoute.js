const express = require('express');
const announcementController = require('../controller/announcementController.js');
const multer = require('../middleware/multer.js');

const router = express.Router();

router.get('/', announcementController.getAllAnnouncements);
router.get('/:id', announcementController.getAnnouncementById);
router.post('/', multer.single('image'), announcementController.createAnnouncement);
router.patch('/:id', multer.single('image'), announcementController.updateAnnouncement);
router.delete('/:id', announcementController.deleteAnnouncement);

module.exports = router;