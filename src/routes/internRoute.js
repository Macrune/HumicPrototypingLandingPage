const express = require('express');
const internController = require('../controller/internController.js');
const multer = require('../middleware/multer.js');
const convertToWebP = require('../middleware/convertToWebp.js');

const router = express.Router();

router.get('/', internController.getAllInterns);
router.get('/:id', internController.getInternById);
router.post('/', multer.single('image'), convertToWebP, internController.createIntern);
router.patch('/:id', multer.single('image'), convertToWebP, internController.updateIntern);
router.delete('/:id', internController.deleteIntern);

module.exports = router;

