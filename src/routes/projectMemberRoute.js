const express = require('express');
const projectMemberController = require('../controller/projectMemberController.js');
const authJWT = require('../middleware/authJWT.js');

const router = express.Router();

/**
 * @swagger
 * tags:
 *    name: Project Member
 *    description: API endpoints for managing project member
 */

/**
 * @swagger
 * components:
 *      schemas:
 *        ProjectMember:
 *          type: object
 *          properties:
 *            id:
 *              type: integer
 *              description: The auto-generated id of the project member
 *            id_project:
 *              type: integer
 *              description: The id of the project that has the member
 *            id_intern:
 *              type: integer
 *              description: The intern id used on the project
 *          required:
 *            - id_project
 *            - id_member
 *          example:
 *            id: 1
 *            id_project: 1
 *            id_member: 3
 */

/**
 * @swagger
 * /api/project_member:
 *  post:
 *      summary: Add a member to a project
 *      tags: [Project Member]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id_project:
 *                  type: string
 *                  description: The id of the project that has the member
 *                  example: 1
 *                id_intern:
 *                  type: string
 *                  description: The intern id used on the project
 *                  example: 3
 *      required:
 *        - id_project
 *        - id_member
 *      responses:
 *        201:
 *          description: Project Member created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ProjectMember'
 *        500:
 *          description: Server error 
 */
router.post('/', authJWT, projectMemberController.createProjectMember);

/**
 * @swagger
 * /api/project_member/{id}:
 *  delete:
 *      summary: Remove a member from a project
 *      tags: [Project Member]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The project member ID
 *      responses:
 *        200:
 *          description: Project member deleted successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Project member deleted successfully
 *        404:
 *          description: Project member not found
 *        500:
 *          description: Server error
 */
router.delete('/:id', authJWT, projectMemberController.deleteProjectMember);

/**
 * @swagger
 * /api/project_member/{id_project}:
 *  get:
 *      summary: Get all the member from a project by project ID
 *      tags: [Project Member]
 *      parameters:
 *        - in: path
 *          name: id_project
 *          schema:
 *            type: integer
 *          required: true
 *          description: The project ID
 *      responses:
 *          200:
 *            description: A list of project member
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                        example: 1
 *                      id_intern:
 *                        type: integer
 *                        example: 1
 *                      name:
 *                        type: string
 *                        example: Johm DOe
 *                      role:
 *                        type: string
 *                        example: Back-End
 *          500:
 *            description: Server error
 */
router.get('/:id_project', projectMemberController.getProjectMemberByProjectId);

module.exports = router;