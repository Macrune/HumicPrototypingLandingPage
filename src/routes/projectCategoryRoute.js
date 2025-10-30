const express = require('express');
const projectCategoryConstroller = require('../controller/projectCategoryController.js');
const authJWT = require('../middleware/authJWT.js');

const router = express.Router();

router.post('/', authJWT, projectCategoryConstroller.createProjectCategory);
router.delete('/:id', authJWT, projectCategoryConstroller.deleteProjectCategory);
router.get('/:id_project', projectCategoryConstroller.getProjectCategoryByProjectId);

module.exports = router;