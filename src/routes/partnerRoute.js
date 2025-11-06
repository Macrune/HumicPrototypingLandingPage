const express = require('express');
const partnerController = require('../controller/partnerController.js');
const multer = require('../middleware/multer.js');
const convertToWebP = require('../middleware/convertToWebp.js');
const authJWT = require('../middleware/authJWT.js');

const router = express.Router();

/**
 * @swagger
 * tags:
 *    name: Partner
 *    description: API endpoints for managing partners
 */

/**
 * @swagger
 * components:
 *    schemas:
 *      Partner:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            description: The auto-generated id of the partner
 *          name:
 *            type: string
 *            description: The name of the partner
 *          description:
 *            type: string
 *            description: Simple description on who the partner is
 *          link:
 *            type: string
 *            description: Link to the partner website
 *          logo:
 *            type: string
 *            description: The url of the partner logo
 *        required:
 *          - name
 *        example:
 *          id: 1
 *          name: Treecard
 *          description: About tree card...
 *          link: www.treecard.org
 *          logo: "/img/treecard.webp"
 */

/**
 * @swagger
 * /api/partners:
 *  get:
 *      summary: Retrieve all partners
 *      tags: [Partner]
 *      responses:
 *        200:
 *          description: A list of partners
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Partner'
 *        500:
 *          description: Server error
 */
router.get('/', partnerController.getAllPartners);

/**
 * @swagger
 * /api/partners/{id}:
 *  get:
 *      summary: Retrieve a partner by ID
 *      tags: [Partner]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The partner ID
 *      responses:
 *        200:
 *          description: Partner data
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Partner'
 *        404:
 *          description: Partner not found
 *        500:
 *          description: Server error
 */
router.get('/:id', partnerController.getPartnerById);

/**
 * @swagger
 * /api/partners:
 *  post:
 *      summary: Create a new partner
 *      tags: [Partner]
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
 *                  description: The name of the partner
 *                  example: Treecard
 *                description:
 *                  type: string
 *                  description: Simple description on who the partner is
 *                  example: About tree card...
 *                link:
 *                  type: string
 *                  description: Link to the partner website
 *                  example: www.treecard.org
 *                logo:
 *                  type: string
 *                  format: binary
 *                  description: The url of the partner logo
 *                  example: (image file)
 *            encoding:
 *              logo:
 *                contentType: image/jpeg, image/png, image/jpg, image/gif, image/webp
 *      required:
 *        - name
 *      responses:
 *        201:
 *          description: Partner created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Partner'
 *        500:
 *          description: Server error 
 */
router.post('/', authJWT, multer.single('logo'), convertToWebP, partnerController.createPartner);

/**
 * @swagger
 * /api/partners/{id}:
 *  patch:
 *      summary: Update an existing partner
 *      tags: [Partner]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The partner ID
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: The name of the partner
 *                  example: Treecard
 *                description:
 *                  type: string
 *                  description: Simple description on who the partner is
 *                  example: About tree card...
 *                link:
 *                  type: string
 *                  description: Link to the partner website
 *                  example: www.treecard.org
 *                logo:
 *                  type: string
 *                  format: binary
 *                  description: The url of the partner logo
 *                  example: (image file)
 *            encoding:
 *              logo:
 *                contentType: image/jpeg, image/png, image/jpg, image/gif, image/webp
 *      responses:
 *        200:
 *          description: Partner updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Partner'
 *        404:
 *          description: Partner not found
 *        500:
 *          description: Server error
 */
router.patch('/:id', authJWT, multer.single('logo'), convertToWebP, partnerController.updatePartner);

/**
 * @swagger
 * /api/partners/{id}:
 *  delete:
 *      summary: Delete a partner
 *      tags: [Partner]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The partner ID
 *      responses:
 *        200:
 *          description: Partner deleted successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Partner deleted successfully
 *        404:
 *          description: Partner not found
 *        500:
 *          description: Server error
 */
router.delete('/:id', authJWT, partnerController.deletePartner);

module.exports = router;