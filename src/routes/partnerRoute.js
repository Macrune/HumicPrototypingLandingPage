const express = require('express');
const partnerController = require('../controller/partnerController.js');
const multer = require('../middleware/multer.js');

const router = express.Router();

router.get('/', partnerController.getAllPartners);
router.get('/:id', partnerController.getPartnerById);
router.post('/', multer.single('logo'), partnerController.createPartner);
router.patch('/:id', multer.single('logo'), partnerController.updatePartner);
router.delete('/:id', partnerController.deletePartner);

module.exports = router;