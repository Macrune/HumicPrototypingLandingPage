const express = require('express');
const newsController = require('../controller/newsController.js');
const multer = require('../middleware/multer.js');
const convertToWebP = require('../middleware/convertToWebp.js');
const authJWT = require('../middleware/authJWT.js');

const router = express.Router();

router.get('/', newsController.getAllNews);
router.get('/:id', newsController.getNewsById);
router.post('/', authJWT, multer.single('image'), convertToWebP, newsController.createNews);
router.patch('/:id', authJWT, multer.single('image'), convertToWebP, newsController.updateNews);
router.delete('/:id', authJWT, newsController.deleteNews);

module.exports = router;