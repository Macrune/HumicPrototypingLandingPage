const express = require('express');
const testimonyController = require('../controller/testimonyController.js');

const router = express.Router();

router.get('/', testimonyController.getAllTestimonies);
router.get('/:id', testimonyController.getTestimonyById);
router.post('/', testimonyController.createTestimony);
router.patch('/:id', testimonyController.updateTestimony);
router.delete('/:id', testimonyController.deleteTestimony);

module.exports = router;