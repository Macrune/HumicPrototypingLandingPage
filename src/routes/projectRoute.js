const express = require('express');
const projectController = require('../controller/projectController');
const multer = require('../middleware/multer');
const convertToWebP = require('../middleware/convertToWebp.js');
const authJWT = require('../middleware/authJWT.js');

const router = express.Router();

/**
 * @swagger
 * tags:
 *    name: Project
 *    description: API endpoints for managing projects
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *        Project:
 *          type: object
 *          properties:
 *            id:
 *              type: integer
 *              description: The auto-generated id of the project
 *            title:
 *              type: string
 *              description: The title of the project
 *            slug:
 *              type: string
 *              description: The slug of the project
 *            description:
 *              type: string
 *              description: Description of what the project is
 *            publication:
 *              type: string
 *              description: Related publication to the project
 *            link:
 *              type: string
 *              description: The URL address to the project
 *            image_path:
 *              type: string
 *              description: The URL of the project image
 *          required:
 *            - title
 *            - description
 *          example:
 *            id: 1
 *            title: HUMIC Prototyping Landing Page
 *            slug: humic-prototyping-landing-page
 *            description: Internship project of creating a landing page for all humic project
 *            publication: Publication example
 *            link: www.humicprototyping.com
 *            image_path: /img/humicprototyping.webp
 */

/**
 * @swagger
 * /api/project:
 *  get:
 *      summary: Get all project
 *      tags: [Project]
 *      responses:
 *        200:
 *          escription: List of project
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Project'
 *        500:
 *          description: Error retrieving project
 */
router.get('/', projectController.getAllProject);

/**
 * @swagger
 * /api/project/search:
 *  get:
 *      summary: Retrieve a list of project based on query given
 *      tags: [Project]
 *      parameters:
 *        - in: query
 *          name: que
 *          schema:
 *            type: string
 *          description: Query given to do search accross all project
 *      responses:
 *        200:
 *          description: A list of project
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Project'
 *        500:
 *          description: Server error
 */
router.get('/search', projectController.getProjectBySearch); // Use query que=? for search term

/**
 * @swagger
 * /api/project/search/internship:
 *  get:
 *      summary: Retrieve a list of project with internship category based on query given
 *      tags: [Project]
 *      parameters:
 *        - in: query
 *          name: que
 *          schema:
 *            type: string
 *          description: Query given to do search accross all internship project
 *      responses:
 *        200:
 *          description: A list of project
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Project'
 *        500:
 *          description: Server error
 */
router.get('/search/internship', projectController.getProjectBySearchInternship); // Use query que=? for search term

/**
 * @swagger
 * /api/project/search/researchshi[]:
 *  get:
 *      summary: Retrieve a list of project with researchship category based on query given
 *      tags: [Project]
 *      parameters:
 *        - in: query
 *          name: que
 *          schema:
 *            type: string
 *          description: Query given to do search accross all researchship project
 *      responses:
 *        200:
 *          description: A list of project
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Project'
 *        500:
 *          description: Server error
 */
router.get('/search/researchship', projectController.getProjectBySearchResearchship); // Use query que=? for search term

/**
 * @swagger
 * /api/project/{id}:
 *  get:
 *      summary: Retrieve a project by ID
 *      tags: [Project]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The project ID
 *      responses:
 *        200:
 *          description: A list of project
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Project'
 *        404:
 *          description: Project not found
 *        500:
 *          description: Server error
 */
router.get('/:id', projectController.getProjectById);

/**
 * @swagger
 * /api/project/slug/{slug}:
 *  get:
 *      summary: Retrieve a project by slug
 *      tags: [Project]
 *      parameters:
 *        - in: path
 *          name: slug
 *          schema:
 *            type: string
 *          required: true
 *          description: The project slug
 *      responses:
 *        200:
 *          description: A list of project
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Project'
 *        404:
 *          description: Project not found
 *        500:
 *          description: Server error
 */
router.get('/slug/:slug', projectController.getProjectBySlug);

/**
 * @swagger
 * /api/project:
 *  post:
 *      summary: Create a new project
 *      tags: [Project]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                  description: The title of the project
 *                  example: HUMIC Prototyping Landing Page
 *                description:
 *                  type: string
 *                  description: Description of what the project is
 *                  example: Internship project of creating a landing page for all humic project
 *                publication:
 *                  type: string
 *                  description: Related publication to the project
 *                  example: Publication example
 *                link:
 *                  type: string
 *                  description: The URL address to the project
 *                  example: www.humicprototyping.com
 *                image:
 *                  type: string
 *                  format: binary
 *                  description: The image file for the project
 *                  example: (image file)
 *            encoding:
 *              image:
 *                contentType: image/jpeg, image/png, image/jpg, image/gif, image/webp
 *      required:
 *        - title
 *        - description
 *      responses:
 *        201:
 *          description: Project created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Project'
 *        500:
 *          description: Server error 
 */
router.post('/', authJWT, multer.single('image'), convertToWebP, projectController.createProject);

/**
 * @swagger
 * /api/project/{id}:
 *  patch:
 *      summary: Update an existing project
 *      tags: [Project]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The project ID
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                  description: The title of the project
 *                  example: HUMIC Prototyping Landing Page
 *                description:
 *                  type: string
 *                  description: Description of what the project is
 *                  example: Internship project of creating a landing page for all humic project
 *                publication:
 *                  type: string
 *                  description: Related publication to the project
 *                  example: Publication example
 *                link:
 *                  type: string
 *                  description: The URL address to the project
 *                  example: www.humicprototyping.com
 *                image:
 *                  type: string
 *                  format: binary
 *                  description: The image file for the project
 *                  example: (image file)
 *            encoding:
 *              image:
 *                contentType: image/jpeg, image/png, image/jpg, image/gif, image/webp
 *      responses:
 *        200:
 *          description: Project updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Project'
 *        404:
 *          description: Project not found
 *        500:
 *          description: Server error
 */
router.patch('/:id', authJWT, multer.single('image'), convertToWebP, projectController.updateProject);

/**
 * @swagger
 * /api/project/{id}:
 *  delete:
 *      summary: Delete a project
 *      tags: [Project]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The project ID
 *      responses:
 *        200:
 *          description: Project deleted successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Project deleted successfully
 *        404:
 *          description: Project not found
 *        500:
 *          description: Server error
 */
router.delete('/:id', authJWT, projectController.deleteProject);

module.exports = router;