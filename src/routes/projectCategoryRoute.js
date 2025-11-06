const express = require('express');
const projectCategoryConstroller = require('../controller/projectCategoryController.js');
const authJWT = require('../middleware/authJWT.js');

const router = express.Router();

/**
 * @swagger
 * tags:
 *    name: Project Category
 *    description: API endpoints for managing project category
 */

/**
 * @swagger
 * components:
 *      schemas:
 *        ProjectCategory:
 *          type: object
 *          properties:
 *            id:
 *              type: integer
 *              description: The auto-generated id of the project category
 *            id_project:
 *              type: integer
 *              description: The id of the project that has the category
 *            id_category:
 *              type: integer
 *              description: The category id used on the project
 *          required:
 *            - id_project
 *            - id_category
 *          example:
 *            id: 1
 *            id_project: 1
 *            id_category: 3
 */

/**
 * @swagger
 * /api/project_category:
 *  post:
 *      summary: Add new category to a project
 *      tags: [Project Category]
 *      security:
 *        - bearerAuth: []
 *      requrestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id_project:
 *                  type: string
 *                  description: The id of the project that has the category
 *                  example: 1
 *                id_category:
 *                  type: string
 *                  description: The category id used on the project
 *                  example: 3
 *      required:
 *        - id_project
 *        - id_category
 *      responses:
 *        201:
 *          description: Project Category created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ProjectCategory'
 *        500:
 *          description: Server error 
 */
router.post('/', authJWT, projectCategoryConstroller.createProjectCategory);

/**
 * @swagger
 * /api/project_category/{id}:
 *  delete:
 *      summary: Remove a category from a project
 *      tags: [Project Category]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The project category ID
 *      responses:
 *        200:
 *          description: Project category deleted successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Project category deleted successfully
 *        404:
 *          description: Project category not found
 *        500:
 *          description: Server error
 */
router.delete('/:id', authJWT, projectCategoryConstroller.deleteProjectCategory);

/**
 * @swagger
 * /api/project_category/{id_project}:
 *  get:
 *      summary: Get all the categories on a project by project ID
 *      tags: [Project Category]
 *      parameters:
 *        - in: path
 *          name: id_project
 *          schema:
 *            type: integer
 *          required: true
 *          description: The project ID
 *      responses:
 *        200:
 *          description: A list of project category
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
 *                    id_category:
 *                      type: integer
 *                      example: 1
 *                    name:
 *                      type: string
 *                      example: Internship
 *        500:
 *          description: Server error
 */
router.get('/:id_project', projectCategoryConstroller.getProjectCategoryByProjectId);

module.exports = router;