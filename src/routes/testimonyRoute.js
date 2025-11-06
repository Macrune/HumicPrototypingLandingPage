const express = require('express');
const testimonyController = require('../controller/testimonyController.js');
const authJWT = require('../middleware/authJWT.js');

const router = express.Router();

/**
 * @swagger
 *  tags:
 *    name: Testimony
 *    description: API endpoints for managing testimonies
 */

/**
 * @swagger
 * components:
 *    schemas:
 *      Testimony:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            description: The auto-generated id of the testimony
 *          id_intern:
 *            type: integer
 *            description: The id for the intern givin the testimony
 *          content:
 *            type: string
 *            description: The content of the testimony
 *          rating:
 *            type: integer
 *            description: The rating for the experience (1-5)
 *        required:
 *          - id_intern
 *          - content
 *          - rating
 *        example:
 *          id: 1
 *          id_intern: 1
 *          content: It was a fun experience learning with HUMIC
 *          rating: 5
 */

/**
 * @swagger
 * /api/testimony:
 *  get:
 *      summary: Retrieve a list of testimonies
 *      tags: [Testimony]
 *      responses:
 *        200:
 *          description: A list of testimonies
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items: 
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: integer
 *                      example: 1
 *                    id_intern:
 *                      type: integer
 *                      example: 1
 *                    name:
 *                      type: string
 *                      example: John Doe
 *                    role:
 *                      type: string
 *                      example: Back-End
 *                    university:
 *                      type: string
 *                      example: Telkom University
 *                    content:
 *                      type: string
 *                      example: It was a fun experience learning with HUMIC
 *                    rating:
 *                      type: integer
 *                      example: 5
 *        500:
 *          description: Server error
 */
router.get('/', testimonyController.getAllTestimonies);

/**
 * @swagger
 * /api/testimony/{id}:
 *  get:
 *      summary: Retrieve a testimony by ID
 *      tags: [Testimony]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The testimony ID
 *      responses:
 *        200:
 *          description: testimony data
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    example: 1
 *                  id_intern:
 *                    type: integer
 *                    example: 1
 *                  name:
 *                    type: string
 *                    example: John Doe
 *                  role:
 *                    type: string
 *                    example: Back-End
 *                  university:
 *                    type: string
 *                    example: Telkom University
 *                  content:
 *                    type: string
 *                    example: It was a fun experience learning with HUMIC
 *                  rating:
 *                    type: integer
 *                    example: 5
 *        
 *        404:
 *          description: Testimony not found
 *        500:
 *          description: Server error
 */
router.get('/:id', testimonyController.getTestimonyById);

/**
 * @swagger
 * /api/testimony:
 *  post:
 *      summary: Create a new testimony
 *      tags: [Testimony]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id_intern:
 *                  type: integer
 *                  description: The id for the intern givin the testimony
 *                  example: 1
 *                content:
 *                  type: string
 *                  description: The content of the testimony
 *                  example: It was a fun experience learning with HUMIC
 *                rating:
 *                  type: int
 *                  description: The rating for the experience (1-5)
 *                  example: 5
 *      required:
 *        - id_intern
 *        - content
 *        - rating
 *      responses:
 *        201:
 *          description: Testimony created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Testimony'
 *        500:
 *          description: Server error 
 */
router.post('/', authJWT, testimonyController.createTestimony);

/**
 * @swagger
 * /api/testimony/{id}:
 *  patch:
 *      summary: Update an existing testimony
 *      tags: [Testimony]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The testimony ID
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id_intern:
 *                  type: integer
 *                  description: The id for the intern givin the testimony
 *                  example: 1
 *                content:
 *                  type: string
 *                  description: The content of the testimony
 *                  example: It was a fun experience learning with HUMIC
 *                rating:
 *                  type: integer
 *                  description: The rating for the experience (1-5)
 *                  example: 5
 *      responses:
 *        200:
 *          description: Testimony updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Testimony'
 *        404:
 *          description: Testimony not found
 *        500:
 *          description: Server error
 */
router.patch('/:id', authJWT, testimonyController.updateTestimony);

/**
 * @swagger
 * /api/testimony/{id}:
 *  delete:
 *      summary: Delete an testimony
 *      tags: [Testimony]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The testimony ID
 *      responses:
 *        200:
 *          description: Testimony deleted successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Testimony deleted successfully
 *        404:
 *          description: Testimony not found
 *        500:
 *          description: Server error
 * 
 */
router.delete('/:id', authJWT, testimonyController.deleteTestimony);

module.exports = router;