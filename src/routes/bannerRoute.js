const express = require('express');
const bannerController = require('../controller/bannerController.js');
const multer = require('../middleware/multer.js');
const convertToWebP = require('../middleware/convertToWebp.js');
const authJWT = require('../middleware/authJWT.js');

const router = express.Router();

/**
 * @swagger
 * tags:
 *    name: Banner
 *    description: API endpoints for adding and removing banner
 */

/**
 * @swagger
 * components:
 *    schemas:
 *      Banner:
 *        type: object
 *        properties:
 *          id:
 *            type: interger
 *            description: The auto-generated id of the banner
 *          image_path:
 *            type: string
 *            description: The URL for banner image
 *        required:
 *          - image_path
 *        example:
 *          id: 1
 *          image_path: /img/banner1.webp
 */

/**
 * @swagger
 * /api/banner:
 *  get:
 *      summary: Retrieve a list of banner URL
 *      tags: [Banner]
 *      responses:
 *        200:
 *          description: A list of banner
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Banner'
 *        500:
 *          description: Server error
 */
router.get('/', bannerController.getAllBanner);

/**
 * @swagger
 * /api/banner:
 *  post:
 *      summary: Create a banner
 *      tags: [Banner]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                image:
 *                  type: string
 *                  format: binary
 *                  description: The image file for the banner
 *                  example: (image file)
 *            encoding:
 *              image:
 *                contentType: image/jpeg, image/png, image/jpg, image/gif, image/webp
 *      required:
 *        - image
 *      responses:
 *        201:
 *          description: Banner created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Banner'
 *        500:
 *          description: Server error 
 */
router.post('/', authJWT, multer.single('image'), convertToWebP, bannerController.createBanner)

/**
 * @swagger
 * /api/banner/{id}:
 *  delete:
 *      summary: Delete a banner
 *      tags: [Banner]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The banner ID
 *      responses:
 *        200:
 *          description: Banner deleted successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Banner deleted successfully
 *        404:
 *          description: Banner not found
 *        500:
 *          description: Server error
 */
router.delete('/:id', authJWT, bannerController.deleteBanner);

module.exports = router;