const express = require('express');
const internController = require('../controller/internController.js');
const multer = require('../middleware/multer.js');
const convertToWebP = require('../middleware/convertToWebp.js');
const authJWT = require('../middleware/authJWT.js');

const router = express.Router();

router.get('/', internController.getAllInterns);
router.get('/:id', internController.getInternById);
router.post('/', authJWT, multer.single('image'), convertToWebP, internController.createIntern);
router.patch('/:id', authJWT, multer.single('image'), convertToWebP, internController.updateIntern);
router.delete('/:id', authJWT, internController.deleteIntern);

module.exports = router;

