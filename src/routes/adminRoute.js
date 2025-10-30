const express = require('express');
const adminController = require('../controller/adminController.js');
const authJWT = require('../middleware/authJWT.js');

const router = express.Router();

router.post('/login', adminController.login);
router.get('/', authJWT, adminController.getAllAdmins);
router.get('/:id', authJWT, adminController.getAdminById);
router.post('/', authJWT, adminController.createAdmin);
router.patch('/:id', authJWT, adminController.updateAdmin);
router.patch('/:id/password', authJWT, adminController.resetPassword);
router.delete('/:id', authJWT, adminController.deleteAdmin);

module.exports = router;
