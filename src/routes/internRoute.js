const express = require('express');
const internController = require('../controller/internController.js');
const multer = require('../middleware/multer.js');

const router = express.Router();

router.get('/', internController.getAllInterns);
router.get('/:id', internController.getInternById);
router.post('/', multer.single('image'), internController.createIntern);
router.patch('/:id', multer.single('image'), internController.updateIntern);
router.delete('/:id', internController.deleteIntern);

module.exports = router;

