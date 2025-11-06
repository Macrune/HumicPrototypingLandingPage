const express = require('express');
const internController = require('../controller/internController.js');
const multer = require('../middleware/multer.js');
const convertToWebP = require('../middleware/convertToWebp.js');
const authJWT = require('../middleware/authJWT.js');

const router = express.Router();

/**
 * @swagger
 * tags:
 *    name: Intern
 *    description: API endpoints for managing intern data
 */

/**
 * @swagger
 * components:
 *    schemas:
 *      Intern:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            description: The auto-generated id of the intern
 *          name:
 *            type: string
 *            description: The name of the intern
 *          role:
 *            type: string
 *            nullable: false
 *            enum:
 *              - Back-End
 *              - Front-End
 *              - UI/UX
 *              - AI Developer
 *              - Data Science
 *              - Network Engineer
 *              - Cybersecurity
 *              - Devops
 *              - Multimedia Designer
 *              - Mobile Developer
 *            description: The role intern has while doing their internship
 *          university:
 *            type: string
 *            description: The university intern came from
 *          major:
 *            type: string
 *            description: The major intern take
 *          email:
 *            type: string
 *            description: The email address of the intern
 *          contact:
 *            type: string
 *            description: The contact number of the intern
 *          linkedin:
 *            type: string
 *            description: Linkedin address of the intern profile
 *          social_media:
 *            type: string
 *            description: Other social media link of the intern
 *          image_url:
 *            type: string
 *            description: The URL of the intern profile picture
 *        required:
 *          - name
 *          - role
 *        example:
 *          id: 1
 *          name: John Doe
 *          role: Back-End
 *          university: Telkom University
 *          major: Informatics
 *          email: johndoe@gmail.com
 *          contact: +62 81333444555
 *          linkedin: www.linkedin.com/in/johndoe
 *          social_media: www.instagram.com/johndoe
 *          image_url: /img/pfp.webp
 */

/**
 * @swagger
 * /api/intern:
 *  get:
 *      summary: Retrieve a list of interns
 *      tags: [Intern]
 *      responses:
 *        200:
 *          description: A list of interns
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Intern'
 *        500:
 *          description: Server error
 */
router.get('/', internController.getAllInterns);

/**
 * @swagger
 * /api/intern/{id}:
 *  get:
 *      summary: Retrieve an intern by ID
 *      tags: [Intern]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The intern ID
 *      responses:
 *        200:
 *          description: Intern data
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Intern'
 *        404:
 *          description: Intern not found
 *        500:
 *          description: Server error
 */
router.get('/:id', internController.getInternById);

/**
 * @swagger
 * /api/intern:
 *  post:
 *      summary: Create a new intern
 *      tags: [Intern]
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
 *                  type: string
 *                  description: The name of the intern
 *                  example: "John Doe"
 *                role:
 *                  type: string
 *                  nullable: false
 *                  enum:
 *                    - Back-End
 *                    - Front-End
 *                    - UI/UX
 *                    - AI Developer
 *                    - Data Science
 *                    - Network Engineer
 *                    - Cybersecurity
 *                    - Devops
 *                    - Multimedia Designer
 *                    - Mobile Developer
 *                  description: The role intern has while doing their internship
 *                  example: "Back-End"
 *                university:
 *                  type: string
 *                  description: The university intern came from
 *                  example: "Telkom University"
 *                major:
 *                  type: string
 *                  description: The major intern take
 *                  example: "Informatics"
 *                email:
 *                  type: string
 *                  description: The email address of the intern
 *                  example: "johndoe@gmail.com"
 *                contact:
 *                  type: string
 *                  description: The contact number of the intern
 *                  example: "+62 81333444555"
 *                linkedin:
 *                  type: string
 *                  description: Linkedin address of the intern profile
 *                  example: "www.linkedin.com/in/johndoe"
 *                social_media:
 *                  type: string
 *                  description: Other social media link of the intern
 *                  example: "www.instagram.com/johndoe"
 *                image:
 *                  type: string
 *                  format: binary
 *                  description: The URL of the intern profile picture
 *                  example: (image file)
 *            encoding:
 *              image:
 *                contentType: image/jpeg, image/png, image/jpg, image/gif, image/webp
 *      required:
 *        - name
 *        - role
 *      responses:
 *        201:
 *          description: Intern created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Intern'
 *        500:
 *          description: Server error 
 */
router.post('/', authJWT, multer.single('image'), convertToWebP, internController.createIntern);

/**
 * @swagger
 * /api/intern/{id}:
 *  patch:
 *      summary: Update an existing intern
 *      tags: [Intern]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The intern ID
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: The name of the intern
 *                  example: "John Doe"
 *                role:
 *                  type: string
 *                  enum:
 *                    - Back-End
 *                    - Front-End
 *                    - UI/UX
 *                    - AI Developer
 *                    - Data Science
 *                    - Network Engineer
 *                    - Cybersecurity
 *                    - Devops
 *                    - Multimedia Designer
 *                    - Mobile Developer
 *                  description: The role intern has while doing their internship
 *                  example: "Back-End"
 *                university:
 *                  type: string
 *                  description: The university intern came from
 *                  example: "Telkom University"
 *                major:
 *                  type: string
 *                  description: The major intern take
 *                  example: "Informatics"
 *                email:
 *                  type: string
 *                  description: The email address of the intern
 *                  example: "johndoe@gmail.com"
 *                contact:
 *                  type: string
 *                  description: The contact number of the intern
 *                  example: "+62 81333444555"
 *                linkedin:
 *                  type: string
 *                  description: Linkedin address of the intern profile
 *                  example: "www.linkedin.com/in/johndoe"
 *                social_media:
 *                  type: string
 *                  description: Other social media link of the intern
 *                  example: "www.instagram.com/johndoe"
 *                image:
 *                  type: string
 *                  format: binary
 *                  description: The URL of the intern profile picture
 *                  example: (image file)
 *            encoding:
 *              image:
 *                contentType: image/jpeg, image/png, image/jpg, image/gif, image/webp
 *      responses:
 *        200:
 *          description: Intern updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Intern'
 *        404:
 *          description: Intern not found
 *        500:
 *          description: Server error
 */
router.patch('/:id', authJWT, multer.single('image'), convertToWebP, internController.updateIntern);

/**
 * @swagger
 * /api/intern/{id}:
 *  delete:
 *      summary: Delete an intern
 *      tags: [Intern]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The intern ID
 *      responses:
 *        200:
 *          description: Intern deleted successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Intern deleted successfully
 *        404:
 *          description: Intern not found
 *        500:
 *          description: Server error
 */
router.delete('/:id', authJWT, internController.deleteIntern);

module.exports = router;

