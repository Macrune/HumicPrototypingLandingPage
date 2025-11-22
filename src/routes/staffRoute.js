const express = require('express');
const staffController = require('../controller/staffController.js')
const multer = require('../middleware/multer.js');
const convertToWebP = require('../middleware/convertToWebp.js');
const authJWT = require('../middleware/authJWT.js');

const router = express.Router();

/**
 * @swagger
 * tags:
 *    name: Staff
 *    description: API endpoints for managing staff
 */

/**
 * @swagger
 * components:
 *      schemas:
 *        Staff:
 *          type: object
 *          properties:
 *            id:
 *              type: integer
 *              description: The auto-generated id of the staff
 *            name:
 *              type: string
 *              description: The name of the staff
 *            position:
 *              type: string
 *              description: The position the staff has
 *            description:
 *              type: string
 *              description: The description on who the staff is
 *            education:
 *              type: string
 *              description: The last education the staff took
 *            publication:
 *              type: string
 *              description: The publication the staff has
 *            email:
 *              type: string
 *              description: The email address for the staff
 *            linkedin:
 *              type: string
 *              description: THe URL for the staff's linkedin profile
 *            social_media:
 *              type: string
 *              description: Other social media link for the staff
 *            image_path:
 *              type: string
 *              description: The URL for the staff profile picture
 *          required:
 *            - name
 *            - position
 *          example:
 *            id: 1
 *            name: John Doe
 *            position: Director of Research Center
 *            description: Lorem ipsum dolor sit amet, consectetur adipiscing elit
 *            education: Ph.D, Telkom University
 *            publication: Publication example
 *            email: johndoe@gmail.com
 *            linkedin: www.linkedin.com/in/johndoe
 *            social_media: www.instagram.com/johndoe
 *            image_path: /img/johndoe.webp
 */

/**
 * @swagger
 * /api/staff:
 *  get:
 *      summary: Retrieve all staff
 *      tags: [Staff]
 *      parameters:
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *          required: false
 *          description: Limit the number of staff returned
 *      responses:
 *        200:
 *          description: A list of staffs
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Staff'
 *        500:
 *          description: Server error
 */
router.get('/', staffController.getAllStaff);

/**
 * @swagger
 * /api/staff/{id}:
 *  get:
 *      summary: Retrieve a staff by ID
 *      tags: [Staff]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The staff ID
 *      responses:
 *        200:
 *          description: Staff data
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Staff'
 *        404:
 *          description: Staff not found
 *        500:
 *          description: Server error
 */
router.get('/:id', staffController.getStaffById);

/**
 * @swagger
 * /api/staff:
 *  post:
 *      summary: Create a new staff
 *      tags: [Staff]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type:
 *                  description: The name of the staff
 *                  example: John Doe
 *                position:
 *                  type:
 *                  description: The position the staff has
 *                  example: Director of Research Center
 *                description:
 *                  type:
 *                  description: The description on who the staff is
 *                  example: Lorem ipsum dolor sit amet, consectetur adipiscing elit
 *                education:
 *                  type:
 *                  description: The last education the staff took
 *                  example: Ph.D, Telkom University
 *                publication:
 *                  type:
 *                  description: The publication the staff has
 *                  example: Publication example
 *                email:
 *                  type:
 *                  description: The email address for the staff
 *                  example: johndoe@gmail.com
 *                linkedin:
 *                  type:
 *                  description: THe URL for the staff's linkedin profile
 *                  example: www.linkedin.com/in/johndoe
 *                social_media:
 *                   type: string
 *                   description: Other social media link for the staff
 *                   example: www.instagram.com/johndoe
 *                image:
 *                  type: string
 *                  format: binary
 *                  description: The URL of the staff profile picture
 *                  example: (image file)
 *            encoding:
 *              image:
 *                contentType: image/jpeg, image/png, image/jpg, image/gif, image/webp
 *      required:
 *        - name
 *        - position
 *      responses:
 *        201:
 *          description: Staff created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Staff'
 *        500:
 *          description: Server error 
 * 
 */
router.post('/', authJWT, multer.single('image'), convertToWebP, staffController.createStaff);

/**
 * @swagger
 * /api/staff/{id}:
 *  patch:
 *      summary: Update an existing staff
 *      tags: [Staff]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The staff ID
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                id: 
 *                  type: integer
 *                  description: The auto-generated id of the staff
 *                  example: 1
 *                name:
 *                  type:
 *                  description: The name of the staff
 *                  example: John Doe
 *                position:
 *                  type:
 *                  description: The position the staff has
 *                  example: Director of Research Center
 *                description:
 *                  type:
 *                  description: The description on who the staff is
 *                  example: Lorem ipsum dolor sit amet, consectetur adipiscing elit
 *                education:
 *                  type:
 *                  description: The last education the staff took
 *                  example: Ph.D, Telkom University
 *                publication:
 *                  type:
 *                  description: The publication the staff has
 *                  example: Publication example
 *                email:
 *                  type:
 *                  description: The email address for the staff
 *                  example: johndoe@gmail.com
 *                linkedin:
 *                  type:
 *                  description: THe URL for the staff's linkedin profile
 *                  example: www.linkedin.com/in/johndoe
 *                social_media:
 *                   type: string
 *                   description: Other social media link for the staff
 *                   example: www.instagram.com/johndoe
 *                image:
 *                  type: string
 *                  format: binary
 *                  description: The URL of the staff profile picture
 *                  example: (image file)
 *            encoding:
 *              image:
 *                contentType: image/jpeg, image/png, image/jpg, image/gif, image/webp
 *      responses:
 *        200:
 *          description: Staff updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Staff'
 *        404:
 *          description: Staff not found
 *        500:
 *          description: Server error
 */
router.patch('/:id', authJWT, multer.single('image'), convertToWebP, staffController.updateStaff);

/**
 * @swagger
 * /api/staff/{id}:
 *  delete:
 *      summary: Delete an staff
 *      tags: [Staff]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The staff ID
 *      responses:
 *        200:
 *          description: Staff deleted successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Staff deleted successfully
 *        404:
 *          description: Staff not found
 *        500:
 *          description: Server error
 */
router.delete('/:id', authJWT, staffController.deleteStaff);

module.exports = router;