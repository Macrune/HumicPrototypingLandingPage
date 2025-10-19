const express = require('express');
const projectCategoryConstroller = require('../controller/projectCategoryController.js');

const router = express.Router();

router.post('/', projectCategoryConstroller.createProjectCategory);
router.delete('/:id', projectCategoryConstroller.deleteProjectCategory);
router.get('/:id_project', projectCategoryConstroller.getProjectCategoryByProjectId);

module.exports = router;