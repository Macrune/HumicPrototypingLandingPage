const express = require('express');
const logsController = require('../controller/logsController.js');
const authJWT = require('../middleware/authJWT.js');

const router = express.Router();

router.get('/', authJWT, logsController.getAllLogs);

module.exports = router;