const express = require('express');
const statisticController = require('../controller/statisticController.js');
const authJWT = require('../middleware/authJWT.js');

const router = express.Router();

/**
 * @swagger
 *  tags:
 *    name: Statistic
 *    description: API endpoints for managing statistic data
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    StatisticData:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: The auto-generated id of the statistic data
 *        name:
 *          type: string
 *          description: The name of the statistic data
 *        value:
 *          type: string
 *          description: The value of the statistic data
 *      required:
 *        - name
 *        - value
 *      example:
 *        id: 1
 *        name: Total Interns
 *        value: 150
 */

/**
 * @swagger
 * /api/statistics:
 *  get:
 *    summary: Retrieve a list of statistic data
 *    tags: [Statistic]
 *    responses:
 *      200:
 *        description: A list of statistic data
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/StatisticData'
 *      500:
 *        description: Server error
 */
router.get('/', statisticController.getAllStatistics);

/**
 * @swagger
 * /api/statistics/{id}:
 *  get:
 *    summary: Retrieve a single statistic data by ID
 *    tags: [Statistic]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The statistic data ID
 *    responses:
 *      200:
 *        description: A single statistic data
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/StatisticData'
 *      404:
 *        description: Statistic data not found
 *      500:
 *        description: Server error
 */
router.get('/:id', statisticController.getStatisticById);

/**
 * @swagger
 * /api/statistics:
 *  post:
 *    summary: Create a new statistic data
 *    tags: [Statistic]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Total Interns
 *              value:
 *                type: string
 *                example: 150
 *    responses:
 *      201:
 *        description: Statistic data created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/StatisticData'
 *      500:
 *        description: Server error
 */
router.post('/', authJWT, statisticController.createStatistic);

/**
 * @swagger
 * /api/statistics/{id}:
 *  patch:
 *    summary: Update a spesific statistic data
 *    tags: [Statistic]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The statistic data ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Total Interns
 *              value:
 *                type: string
 *                example: 150
 *    responses:
 *      200:
 *        description: Statistic data updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/StatisticData'
 *      404:
 *        description: Statistic data not found
 *      500:
 *        description: Server error
 */
router.patch('/:id', authJWT, statisticController.updateStatistic);

/**
 * @swagger
 * /api/statistics/{id}:
 *  delete:
 *      summary: Delete a statistic data
 *      tags: [Statistic]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The statistic data ID
 *      responses:
 *        200:
 *          description: Statistic data deleted successfully
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
router.delete('/:id', authJWT, statisticController.deleteStatistic);

module.exports = router;