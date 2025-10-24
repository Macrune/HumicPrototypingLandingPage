const express = require('express');
const agendaController = require('../controller/agendaController.js');
const multer = require('../middleware/multer.js');
const convertToWebP = require('../middleware/convertToWebp.js');

const router = express.Router();

router.get('/', agendaController.getAllAgendas); // Handle ?sort and ?limit
router.get('/:id', agendaController.getAgendaById);
router.post('/', multer.single('image'), convertToWebP, agendaController.createAgenda);
router.patch('/:id', multer.single('image'), convertToWebP, agendaController.updateAgenda);
router.delete('/:id', agendaController.deleteAgenda);

module.exports = router;