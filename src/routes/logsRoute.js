const express = require('express');
const logsController = require('../controller/logsController.js');

const router = express.Router();

router.get('/', logsController.getAllLogs);

module.exports = router;