const express = require('express');
const adminController = require('../controller/adminController.js');
const authJWT = require('../middleware/authJWT.js');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management and login
 */

/**
 * @swagger
 * components:
 *    schemas:
 *      Admin:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            description: The auto-generated id of the admin
 *          username:
 *            type: string
 *            description: The username of the admin
 *          password_hash:
 *            type: string
 *            description: The hashed password of the admin
 *          last_login:
 *            type: string
 *            format: date-time
 *            description: The last login time of the admin
 *        required:
 *          - username
 *          - password_hash
 *        example:
 *          id: 1
 *          username: admin
 *          password_hash: $2b$10$weSjUS67T/jO0sGVQenAjuTOFLgqRS4FGf/CcJvIZM.wbSBBNznra
 *          last_login: 2024-01-01T12:00:00Z
 */

/**
 * @swagger
 * /api/admin/login:
 *  post:
 *      summary: Admin login
 *      tags: [Admin]
 *      requestBody:
 *        required: true
 *        content:
 *           application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                    username:
 *                       type: string
 *                       example: master admin
 *                    password:
 *                       type: string
 *                       example: password
 *      responses:
 *        200:
 *          description: Successful login
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Login Successful
 *                  token:
 *                    type: string
 *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                  admin:
 *                   type: object
 *                   properties:
 *                    id:
 *                      type: integer
 *                      example: 1
 *                    username:
 *                      type: string
 *                      example: admin
 *        400:
 *          description: Username and password are required
 *        401:
 *          description: Unauthorized - Invalid credentials
 *        500:
 *          description: Server error
 */
router.post('/login', adminController.login);

/**
 * @swagger
 * /api/admin:
 *  get:
 *      summary: Get all admins
 *      tags: [Admin]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: List of admins
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Admin'
 *        500:
 *          description: Error retrieving admins
 * 
 */
router.get('/', authJWT, adminController.getAllAdmins);

/**
 * @swagger
 * /api/admin/{id}:
 *  get:
 *      summary: Get admin by ID
 *      tags: [Admin]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The admin ID
 *      responses:
 *        200:
 *          description: Admin data
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Admin'
 *        404:
 *          description: Admin not found
 *        500:
 *          description: Error retrieving admin
 */
router.get('/:id', authJWT, adminController.getAdminById);

/**
 * @swagger
 * /api/admin:
 *  post:
 *      summary: Create a new admin
 *      tags: [Admin]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  example: newadmin
 *                password:
 *                  type: string
 *                  example: newadminpassword
 *      responses:
 *        201:
 *          description: Admin created successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    example: 2
 *                  username:
 *                    type: string
 *                    example: newadmin
 *        400:
 *          description: Username already exists
 *        500:
 *          description: Error creating admin
 */
router.post('/', authJWT, adminController.createAdmin);

/**
 * @swagger
 * /api/admin/{id}:
 *  patch:
 *      summary: Update an existing admin
 *      tags: [Admin]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The admin ID
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  example: newadmin
 *                password:
 *                  type: string
 *                  example: newadminpassword
 *      responses:
 *        200:
 *          description: Admin updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    example: 2
 *                  username:
 *                    type: string
 *                    example: newadmin
 *        404:
 *          description: Admin not found
 *        500:
 *          description: Error updating admin
 */
router.patch('/:id', authJWT, adminController.updateAdmin);

/**
 * @swagger
 * /api/admin/{id}/password:
 *  patch:
 *      summary: Reset admin password
 *      tags: [Admin]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The admin ID
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                new_password:
 *                  type: string
 *                  example: newsecurepassword
 *                  description: The new password for the admin
 *      responses:
 *        200:
 *          description: Password reset successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Password reset successfully
 *        404:
 *          description: Admin not found
 *        500:
 *          description: Error resetting password
 */
router.patch('/:id/password', authJWT, adminController.resetPassword);

/**
 * @swagger
 * /api/admin/{id}:
 *  delete:
 *      summary: Delete an admin
 *      tags: [Admin]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The admin ID
 *      responses:
 *        200:
 *          description: Admin deleted successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Admin deleted successfully
 *        404:
 *          description: Admin not found
 *        500:
 *          description: Error deleting admin
 */
router.delete('/:id', authJWT, adminController.deleteAdmin);

module.exports = router;
