const express = require('express');
const categoryController = require('../controller/categoryController.js');

const router = express.Router();

router.get('/', categoryController.getAllCategorys);
router.get('/:id', categoryController.getCategoryById);
router.post('/', categoryController.createCategory);
router.patch('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;