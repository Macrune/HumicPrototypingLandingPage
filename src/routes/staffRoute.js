const express = require('express');
const staffController = require('../controller/staffController.js')
const multer = require('../middleware/multer.js');

const router = express.Router();

// Get all staff members
router.get('/', staffController.getAllStaff);

// Get a specific staff member by ID
router.get('/:id', staffController.getStaffById);

// Add a new staff member
router.post('/', multer.single('image'), staffController.createStaff);

// Update a staff member by ID
router.patch('/:id', multer.single('image'), staffController.updateStaff);

// Delete a staff member by ID
router.delete('/:id', staffController.deleteStaff);

module.exports = router;