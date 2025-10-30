const express = require('express');
const staffController = require('../controller/staffController.js')
const multer = require('../middleware/multer.js');
const convertToWebP = require('../middleware/convertToWebp.js');
const authJWT = require('../middleware/authJWT.js');

const router = express.Router();

// Get all staff members
router.get('/', staffController.getAllStaff);

// Get a specific staff member by ID
router.get('/:id', staffController.getStaffById);

// Add a new staff member
router.post('/', authJWT, multer.single('image'), convertToWebP, staffController.createStaff);

// Update a staff member by ID
router.patch('/:id', authJWT, multer.single('image'), convertToWebP, staffController.updateStaff);

// Delete a staff member by ID
router.delete('/:id', authJWT, staffController.deleteStaff);

module.exports = router;