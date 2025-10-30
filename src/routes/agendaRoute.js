const express = require('express');
const agendaController = require('../controller/agendaController.js');
const multer = require('../middleware/multer.js');
const convertToWebP = require('../middleware/convertToWebp.js');
const authJWT = require('../middleware/authJWT.js');

const router = express.Router();

router.get('/', agendaController.getAllAgendas); // Handle ?sort and ?limit
router.get('/:id', agendaController.getAgendaById);
router.post('/', authJWT, multer.single('image'), convertToWebP, agendaController.createAgenda);
router.patch('/:id', authJWT, multer.single('image'), convertToWebP, agendaController.updateAgenda);
router.delete('/:id', authJWT, agendaController.deleteAgenda);

module.exports = router;