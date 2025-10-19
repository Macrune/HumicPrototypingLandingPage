const express = require('express');
const agendaController = require('../controller/agendaController.js');
const multer = require('../middleware/multer.js');

const router = express.Router();

router.get('/', agendaController.getAllAgendas);
router.get('/:id', agendaController.getAgendaById);
router.post('/', multer.single('image'), agendaController.createAgenda);
router.patch('/:id', multer.single('image'), agendaController.updateAgenda);
router.delete('/:id', agendaController.deleteAgenda);

module.exports = router;