const express = require('express');
const projectMemberController = require('../controller/projectMemberController.js');

const router = express.Router();

router.post('/', projectMemberController.createProjectMember);
router.delete('/:id', projectMemberController.deleteProjectMember);
router.get('/:id_project', projectMemberController.getProjectMemberByProjectId);

module.exports = router;