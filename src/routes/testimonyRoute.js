const express = require('express');
const testimonyController = require('../controller/testimonyController.js');
const authJWT = require('../middleware/authJWT.js');

const router = express.Router();

router.get('/', testimonyController.getAllTestimonies);
router.get('/:id', testimonyController.getTestimonyById);
router.post('/', authJWT, testimonyController.createTestimony);
router.patch('/:id', authJWT, testimonyController.updateTestimony);
router.delete('/:id', authJWT, testimonyController.deleteTestimony);

module.exports = router;