const express = require('express');
const categoryController = require('../controller/categoryController.js');
const authJWT = require('../middleware/authJWT.js');

const router = express.Router();

/**
 * @swagger
 * tags:
 *    name: Category
 *    description: API endpoints for managing categories
 */

/**
 * @swagger
 * components:
 *      schemas:
 *        Category:
 *          type: object
 *          properties:
 *            id:
 *              type: integer
 *              description: The auto-generated id of the category
 *            name:
 *              type: string
 *              description: The name of the category
 *          required:
 *            - name
 *          example:
 *            id: 1
 *            name: Internship
 */

/**
 * @swagger
 * /api/category:
 *  get:
 *      summary: Retrieve all category
 *      tags: [Category]
 *      responses:
 *        200:
 *          description: A list of categories
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Category'
 *        500:
 *          description: Server error
 */
router.get('/', categoryController.getAllCategorys);

/**
 * @swagger
 * /api/category/{id}:
 *  get:
 *      summary: Retrieve a category by ID
 *      tags: [Category]
 *      parameters:
 *        in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The category ID
 *      responses:
 *        200:
 *          description: Category data
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Category'
 *        404:
 *          description: Category not found
 *        500:
 *          description: Server error
 */
router.get('/:id', categoryController.getCategoryById);

/**
 * @swagger
 * /api/category:
 *  post:
 *      summary: Create a new category
 *      tags: [Category]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: The name of the new category
 *                  example: "Software Development"
 *      responses:
 *        201:
 *          description: Category created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Category'
 *        500:
 *          description: Server error 
 */
router.post('/', authJWT, categoryController.createCategory);

/**
 * @swagger
 * /api/category/{id}:
 *  patch:
 *      summary: Update an existing category
 *      tags: [Category]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The category ID
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: The name of the new category
 *                  example: "Software Development"
 *      responses:
 *        201:
 *          description: Category created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Category'
 *        500:
 *          description: Server error 
 */
router.patch('/:id', authJWT, categoryController.updateCategory);

/**
 * @swagger
 * /api/category/{id}:
 *  delete:
 *      summary: Delete a category
 *      tags: [Category]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The category ID
 *      responses:
 *        200:
 *          description: Category deleted successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Category deleted successfully
 *        404:
 *          description: Category not found
 *        500:
 *          description: Server error
 */
router.delete('/:id', authJWT, categoryController.deleteCategory);

module.exports = router;