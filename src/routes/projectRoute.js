const express = require('express');
const projectController = require('../controller/projectController');
const multer = require('../middleware/multer');

const router = express.Router();

router.get('/', projectController.getAllProject);
router.get('/:id', projectController.getProjectById);
router.post('/', multer.single('image'), projectController.createProject);
router.patch('/:id', multer.single('image'), projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;