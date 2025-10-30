const express = require('express');
const projectMemberController = require('../controller/projectMemberController.js');
const authJWT = require('../middleware/authJWT.js');

const router = express.Router();

router.post('/', authJWT, projectMemberController.createProjectMember);
router.delete('/:id', authJWT, projectMemberController.deleteProjectMember);
router.get('/:id_project', projectMemberController.getProjectMemberByProjectId);

module.exports = router;