const express = require('express');
const announcementController = require('../controller/announcementController.js');
const multer = require('../middleware/multer.js');
const convertToWebP = require('../middleware/convertToWebp.js');
const authJWT = require('../middleware/authJWT.js');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Announcements
 *   description: API endpoints for managing announcements
 */

/**
 * @swagger
 * components:
 *      schemas:
 *        Announcement:
 *          type: object
 *          properties:
 *            id:
 *              type: integer
 *              description: The auto-generated id of the announcement
 *            title:
 *              type: string
 *              description: The title of the announcement
 *            content:
 *              type: string
 *              description: The content/details of the announcement
 *            date:
 *              type: string
 *              format: date
 *              description: The date of the announcement
 *            image_url:
 *              type: string
 *              description: The URL of the announcement image
 *          required:
 *            - title
 *            - content
 *            - date
 *          example:
 *            id: 1
 *            title: "New Internship Program"
 *            content: "We are excited to announce our new internship program starting this summer."
 *            date: "2023-12-01"
 *            image_url: "/img/announcement1.webp"
 */

/**
 * @swagger
 * /api/pengumuman:
 *  get:
 *      summary: Retrieve a list of announcements
 *      tags: [Announcements]
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
 *          description: Limit the number of announcements returned (can be 0 to get all)
 *      responses:
 *        200:
 *          description: A list of announcements
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Announcement'
 *        500:
 *          description: Server error
 */
router.get('/', announcementController.getAllAnnouncements); // Handle ?sort and ?limit

/**
 * @swagger
 * /api/pengumuman/{id}:
 *  get:
 *      summary: Retrieve an announcement by ID
 *      tags: [Announcements]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The announcement ID
 *      responses:
 *        200:
 *          description: Announcement data
 *          content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Announcement'
 *        404:
 *          description: Announcement not found
 *        500:
 *          description: Server error
 */
router.get('/:id', announcementController.getAnnouncementById);

/**
 * @swagger
 * /api/pengumuman:
 *  post:
 *      summary: Create a new announcement
 *      tags: [Announcements]
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                  description: The title of the announcement
 *                  example: "New Internship Program"
 *                content:
 *                  type: string
 *                  description: The content/details of the announcement
 *                  example: "We are excited to announce our new internship program starting this summer."
 *                date:
 *                  type: string
 *                  format: date
 *                  description: The date of the announcement
 *                  example: "2023-12-01"
 *                image:
 *                  type: string
 *                  format: binary
 *                  description: The image file for the announcement
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
 *          description: Announcement created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Announcement'
 *        500:
 *          description: Server error
 */
router.post('/', authJWT, multer.single('image'), convertToWebP, announcementController.createAnnouncement);

/**
 * @swagger
 * /api/pengumuman/{id}:
 *  patch:
 *      summary: Update an existing announcement
 *      tags: [Announcements]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The announcement ID
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                  description: The title of the announcement
 *                  example: "New Internship Program"
 *                content:
 *                  type: string
 *                  description: The content/details of the announcement
 *                  example: "We are excited to announce our new internship program starting this summer."
 *                date:
 *                  type: string
 *                  format: date
 *                  description: The date of the announcement
 *                  example: "2023-12-01"
 *                image:
 *                  type: string
 *                  format: binary
 *                  description: The image file for the announcement
 *                  example: (image file)
 *            encoding:
 *              image:
 *                contentType: image/jpeg, image/png, image/jpg, image/gif, image/webp
 *      responses:
 *        200:
 *          description: Announcement updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Announcement'
 *        500:
 *          description: Server error
 */
router.patch('/:id', authJWT, multer.single('image'), convertToWebP, announcementController.updateAnnouncement);

/**
 * @swagger
 * /api/pengumuman/{id}:
 *  delete:
 *      summary: Delete an announcement
 *      tags: [Announcements]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The announcement ID
 *      responses:
 *        200:
 *          description: Announcement deleted successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Announcement deleted successfully
 *        404:
 *          description: Announcement not found
 *        500:
 *          description: Server error
 */
router.delete('/:id', authJWT, announcementController.deleteAnnouncement);

module.exports = router;