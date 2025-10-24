const express = require('express');
const partnerController = require('../controller/partnerController.js');
const multer = require('../middleware/multer.js');
const convertToWebP = require('../middleware/convertToWebp.js');

const router = express.Router();

router.get('/', partnerController.getAllPartners);
router.get('/:id', partnerController.getPartnerById);
router.post('/', multer.single('logo'), convertToWebP, partnerController.createPartner);
router.patch('/:id', multer.single('logo'), convertToWebP, partnerController.updatePartner);
router.delete('/:id', partnerController.deletePartner);

module.exports = router;