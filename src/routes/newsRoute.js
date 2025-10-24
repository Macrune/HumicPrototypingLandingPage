const express = require('express');
const newsController = require('../controller/newsController.js');
const multer = require('../middleware/multer.js');
const fileHelper = require('../config/fileHelper.js');
const path = require('path');
const convertToWebP = require('../middleware/convertToWebp.js');

const router = express.Router();

router.get('/', newsController.getAllNews);
router.get('/:id', newsController.getNewsById);
router.post('/', multer.single('image'), convertToWebP, newsController.createNews);
router.patch('/:id', multer.single('image'), convertToWebP, newsController.updateNews);
router.delete('/:id', newsController.deleteNews);

module.exports = router;