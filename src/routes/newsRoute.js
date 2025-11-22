const express = require('express');
const newsController = require('../controller/newsController.js');
const multer = require('../middleware/multer.js');
const convertToWebP = require('../middleware/convertToWebp.js');
const authJWT = require('../middleware/authJWT.js');

const router = express.Router();

/**
 * @swagger
 * tags:
 *    name: News
 *    description: API endpoints for managing news
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      News:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            description: The auto-generated id of the news
 *          title:
 *            type: string
 *            description: The title of the news
 *          slug:
 *            type: string
 *            description: The slug of the news
 *          content:
 *            type: string
 *            description: The content/details of the news
 *          author:
 *            type: string
 *            description: The writer of the news
 *          date:
 *            type: string
 *            format: date
 *            description: The date of the news
 *          image_url:
 *            type: string
 *            description: The URL of the news image
 *        required:
 *          - title
 *          - content
 *          - author
 *          - date
 *        example:
 *          id: 1
 *          title: "Major News of new Internship"
 *          slug: "major-news-of-new-internship"
 *          content: "Lorem ipsum dolor sit amet"
 *          author: "John Doe"
 *          date: "2023-11-15"
 *          image_url: "/img/news1.webp"
 */

/**
 * @swagger
 * /api/berita:
 *  get:
 *      summary: Retrieve a list of news
 *      tags: [News]
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
 *          description: Limit the number of newss returned (can be 0 to get all)
 *      responses:
 *        200:
 *          description: A list of news
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/News'
 *        500:
 *          description: Server error
 */
router.get('/', newsController.getAllNews);

/**
 * @swagger
 * /api/berita/{id}:
 *  get:
 *      summary: Retreive a news by ID
 *      tags: [News]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The news ID
 *      responses:
 *        200:
 *          description: News data
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/News'
 *        404:
 *          description: News not found
 *        500:
 *          description: Server error
 */
router.get('/:id', newsController.getNewsById);

/**
 * @swagger
 * /api/berita/slug/{slug}:
 *  get:
 *      summary: Retreive a news by slug
 *      tags: [News]
 *      parameters:
 *        - in: path
 *          name: slug
 *          schema:
 *            type: string
 *          required: true
 *          description: The news slug
 *      responses:
 *        200:
 *          description: News data
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/News'
 *        404:
 *          description: News not found
 *        500:
 *          description: Server error
 */
router.get('/slug/:slug', newsController.getNewsBySlug);

/**
 * @swagger
 * /api/berita:
 *  post:
 *      summary: Create a new news
 *      tags: [News]
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
 *                  description: The title of the news
 *                  example: "Major News of new Internship"
 *                content:
 *                  type: string
 *                  description: The content/details of the news
 *                  example: "Lorem ipsum dolor sit amet"
 *                author:
 *                  type: string
 *                  description: The writer of the news
 *                  example: "Johm Doe"
 *                date:
 *                  type: string
 *                  format: date
 *                  description: The date of the news
 *                  example: "2023-11-15"
 *                image:
 *                  type: string
 *                  format: binary
 *                  description: The image file for the news
 *                  example: (image file)
 *            encoding:
 *              image:
 *                contentType: image/jpeg, image/png, image/jpg, image/gif, image/webp
 *      required:
 *        - title
 *        - content
 *        - author
 *        - date
 *      responses:
 *        201:
 *          description: News created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/News'
 *        500:
 *          description: Server error 
 */
router.post('/', authJWT, multer.single('image'), convertToWebP, newsController.createNews);

/**
 * @swagger
 * /api/berita/{id}:
 *  patch:
 *      summary: Update an existing news
 *      tags: [News]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The news ID
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                  description: The title of the news
 *                  example: "Major News of new Internship"
 *                content:
 *                  type: string
 *                  description: The content/details of the news
 *                  example: "Lorem ipsum dolor sit amet"
 *                author:
 *                  type: string
 *                  description: The writer of the news
 *                  example: "Johm Doe"
 *                date:
 *                  type: string
 *                  format: date
 *                  description: The date of the news
 *                  example: "2023-11-15"
 *                image:
 *                  type: string
 *                  format: binary
 *                  description: The image file for the news
 *                  example: (image file)
 *            encoding:
 *              image:
 *                contentType: image/jpeg, image/png, image/jpg, image/gif, image/webp
 *      responses:
 *        200:
 *          description: News updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/News'
 *        404:
 *          description: News not found
 *        500:
 *          description: Server error
 */
router.patch('/:id', authJWT, multer.single('image'), convertToWebP, newsController.updateNews);

/**
 * @swagger
 * /api/berita/{id}:
 *  delete:
 *      summary: Delete a news
 *      tags: [News]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The news ID
 *      responses:
 *        200:
 *          description: News deleted successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: News deleted successfully
 *        404:
 *          description: News not found
 *        500:
 *          description: Server error
 */
router.delete('/:id', authJWT, newsController.deleteNews);

module.exports = router;