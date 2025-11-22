const express = require('express');
const agendaController = require('../controller/agendaController.js');
const multer = require('../middleware/multer.js');
const convertToWebP = require('../middleware/convertToWebp.js');
const authJWT = require('../middleware/authJWT.js');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Agenda
 *   description: API endpoints for managing agendas
 */

/**
 * @swagger
 * components:
 *    schemas:
 *      Agenda:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            description: The auto-generated id of the agenda
 *          title:
 *            type: string
 *            description: The title of the agenda
 *          slug:
 *            type: string
 *            description: The slug of the agenda
 *          content:
 *            type: string
 *            description: The content/details of the agenda
 *          date:
 *            type: string
 *            format: date
 *            description: The date of the agenda
 *          image_url:
 *            type: string
 *            description: The URL of the agenda image
 *        required:
 *          - title
 *          - content
 *          - date
 *        example:
 *          id: 1
 *          title: "Team Meeting"
 *          slug: "team-meeting"
 *          content: "Monthly team meeting to discuss project updates."
 *          date: "2023-11-15"
 *          image_url: "/img/agenda1.webp"
 */

/**
 * @swagger
 * /api/agenda:
 *  get:
 *      summary: Retrieve a list of agendas
 *      tags: [Agenda]
 *      parameters:
 *        - in: query
 *          name: order
 *          schema:
 *            type: string
 *            default: 'DESC'
 *          description: Sort order (e.g., 'DESC' or 'ASC')
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *            default: 0 
 *          description: Limit the number of agendas returned (can be 0 to get all)
 *      responses:
 *        200:
 *          description: A list of agendas
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Agenda'
 *        500:
 *          description: Server error
 */
router.get('/', agendaController.getAllAgendas); // Handle ?sort and ?limit

/**
 * @swagger
 * /api/agenda/{id}:
 *  get:
 *      summary: Retrieve an agenda by ID
 *      tags: [Agenda]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The agenda ID
 *      responses:
 *        200:
 *          description: Agenda data
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Agenda'
 *        404:
 *          description: Agenda not found
 *        500:
 *          description: Server error
 */
router.get('/:id', agendaController.getAgendaById);

/**
 * @swagger
 * /api/agenda/slug/{slug}:
 *  get:
 *      summary: Retrieve an agenda by slug
 *      tags: [Agenda]
 *      parameters:
 *        - in: path
 *          name: slug
 *          schema:
 *            type: string
 *          required: true
 *          description: The agenda slug
 *      responses:
 *        200:
 *          description: Agenda data
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Agenda'
 *        404:
 *          description: Agenda not found
 *        500:
 *          description: Server error
 */
router.get('/slug/:slug', agendaController.getAgendaBySlug);

/**
 * @swagger
 * /api/agenda:
 *  post:
 *      summary: Create a new agenda
 *      tags: [Agenda]
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
 *                  description: The title of the agenda
 *                  example: "Project Kickoff Meeting"
 *                content:
 *                  type: string
 *                  description: The content/details of the agenda
 *                  example: "Initial meeting to discuss project scope and deliverables."
 *                date:
 *                  type: string
 *                  format: date
 *                  description: The date of the agenda
 *                  example: "2023-12-01"
 *                image:
 *                  type: string
 *                  format: binary
 *                  description: The image file for the agenda
 *                  example: (image file)
 *            encoding:
 *              image:
 *                contentType: image/jpeg, image/png, image/jpg, image/gif, image/webp
 *      required:
 *        - title
 *        - content
 *        - date
 *      responses:
 *        201:
 *          description: Agenda created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Agenda'
 *        500:
 *          description: Server error 
*/
router.post('/', authJWT, multer.single('image'), convertToWebP, agendaController.createAgenda);

/**
 * @swagger
 * /api/agenda/{id}:
 *  patch:
 *      summary: Update an existing agenda
 *      tags: [Agenda]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The agenda ID
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                  description: The title of the agenda
 *                  example: "Updated Project Kickoff Meeting"
 *                content:
 *                  type: string
 *                  description: The content/details of the agenda
 *                  example: "Updated details for the project kickoff meeting."
 *                date:
 *                  type: string
 *                  format: date
 *                  description: The date of the agenda
 *                  example: "2023-12-02"
 *                image:
 *                  type: string
 *                  format: binary
 *                  description: The image file for the agenda
 *                  example: (image file)
 *            encoding:
 *              image:
 *                contentType: image/jpeg, image/png, image/jpg, image/gif, image/webp
 *      responses:
 *        200:
 *          description: Agenda updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Agenda'
 *        404:
 *          description: Agenda not found
 *        500:
 *          description: Server error
 */
router.patch('/:id', authJWT, multer.single('image'), convertToWebP, agendaController.updateAgenda);

/**
 * @swagger
 * /api/agenda/{id}:
 *  delete:
 *      summary: Delete an agenda
 *      tags: [Agenda]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The agenda ID
 *      responses:
 *        200:
 *          description: Agenda deleted successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Agenda deleted successfully
 *        404:
 *          description: Agenda not found
 *        500:
 *          description: Server error
 */
router.delete('/:id', authJWT, agendaController.deleteAgenda);

module.exports = router;