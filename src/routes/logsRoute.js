const express = require('express');
const logsController = require('../controller/logsController.js');
const authJWT = require('../middleware/authJWT.js');

const router = express.Router();

/**
 * @swagger
 * tags:
 *    name: Logs
 *    description: API endpoints for getting system logs
 */

/**
 * @swagger
 * components:
 *      schemas:
 *        Log:
 *          type: object
 *          properties:
 *            id:
 *              type: integer
 *              description: The auto-generated id of the log
 *            id_admin:
 *              type: integer
 *              description: The id of the admin managing the system
 *            action:
 *              type: string
 *              description: The action used on the table (CREATE, UPDATE, DELETE)
 *            target_table:
 *              type: string
 *              description: The table targeted for the action
 *            target_id:
 *              type: integer
 *              description: The affected id by the action
 *            description:
 *              type: string
 *              description: Simple descriptio of what happened
 *            created_at:
 *              type: string
 *              format: datetime
 *              description: The date and time the log is created
 *          required:
 *            - id_admin
 *            - action
 *            - target_table
 *            - target_id
 *            - description
 *          example:
 *            id: 1
 *            id_admin: 1
 *            action: CREATE
 *            target_table: agenda
 *            target_id: 1
 *            description: master admin Created agenda with title new agenda
 *            created_at: 2024-01-01T12:00:00Z
 */

/**
 * @swagger
 * /api/logs:
 *  get:
 *      summary: Retrieve a list of logs
 *      tags: [Logs]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *            default: 0 
 *          description: Limit the number of logs returned (can be 0 to get all)
 *      responses:
 *        200:
 *          description: A list of logs
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Log'
 *        500:
 *          description: Server error
 */
router.get('/', authJWT, logsController.getAllLogs);

module.exports = router;