const express = require('express');
const categoryController = require('../controller/categoryController.js');
const authJWT = require('../middleware/authJWT.js');

const router = express.Router();

router.get('/', categoryController.getAllCategorys);
router.get('/:id', categoryController.getCategoryById);
router.post('/', authJWT, categoryController.createCategory);
router.patch('/:id', authJWT, categoryController.updateCategory);
router.delete('/:id', authJWT, categoryController.deleteCategory);

module.exports = router;