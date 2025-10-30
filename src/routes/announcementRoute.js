const express = require('express');
const announcementController = require('../controller/announcementController.js');
const multer = require('../middleware/multer.js');
const convertToWebP = require('../middleware/convertToWebp.js');
const authJWT = require('../middleware/authJWT.js');

const router = express.Router();

router.get('/', announcementController.getAllAnnouncements);
router.get('/:id', announcementController.getAnnouncementById);
router.post('/', authJWT, multer.single('image'), convertToWebP, announcementController.createAnnouncement);
router.patch('/:id', authJWT, multer.single('image'), convertToWebP, announcementController.updateAnnouncement);
router.delete('/:id', authJWT, announcementController.deleteAnnouncement);

module.exports = router;