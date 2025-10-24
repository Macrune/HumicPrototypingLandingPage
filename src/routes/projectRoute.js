const express = require('express');
const projectController = require('../controller/projectController');
const multer = require('../middleware/multer');
const convertToWebP = require('../middleware/convertToWebp.js');

const router = express.Router();

router.get('/', projectController.getAllProject);
router.get('/:id', projectController.getProjectById);
router.post('/', multer.single('image'), convertToWebP, projectController.createProject);
router.patch('/:id', multer.single('image'), convertToWebP, projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;