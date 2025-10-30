const express = require('express');
const projectController = require('../controller/projectController');
const multer = require('../middleware/multer');
const convertToWebP = require('../middleware/convertToWebp.js');
const authJWT = require('../middleware/authJWT.js');

const router = express.Router();

router.get('/', projectController.getAllProject);
router.get('/search', projectController.getProjectBySearch); // Use query que=? for search term
router.get('/:id', projectController.getProjectById);
router.post('/', authJWT, multer.single('image'), convertToWebP, projectController.createProject);
router.patch('/:id', authJWT, multer.single('image'), convertToWebP, projectController.updateProject);
router.delete('/:id', authJWT, projectController.deleteProject);

module.exports = router;