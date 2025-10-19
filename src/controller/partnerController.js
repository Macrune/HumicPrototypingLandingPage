const partnerModel = require('../models/partnerModel.js');
const fileHelper = require('../config/fileHelper.js');
const path = require('path');

const uploadImage = async (image) => {
    try {
        if (!image) {
            throw new Error('No image file provided');
        }

        const filePath = `/${process.env.IMG_DIR}/${image.filename}`;
        return filePath;
    } catch (error) {
        throw new Error('Image upload failed: ' + error.message);
    }
};

const partnerController = {
    getAllPartners: async (req, res) => {
        try {
            const [rows] = await partnerModel.findAll();
            res.json(rows);
        } catch (err) {
            res.status(500).json({ errorPartnerRouteGe: err.message });
        }
    },
    getPartnerById: async (req, res) => {
        const { id } = req.params;
        try {
            const [rows] = await partnerModel.findById(id);
            if (rows.length === 0) {
                return res.status(404).json({ error: 'Partner not found' });
            }
            res.json(rows[0]);
        } catch (err) {
            res.status(500).json({ errorPartnerRouteGI: err.message });
        }
    },
    createPartner: async (req, res) => {
        const { name, description, link } = req.body;
        const logo = req.file;
        let logoPath = null;
        try {
            logoPath = await uploadImage(logo);
            const [result] = await partnerModel.create(name, description, link, logoPath);
            res.status(201).json({ id: result.insertId, name, description, link, logo : logoPath });
        } catch (err) {
            if (logoPath) {
                const oldFile = path.basename(logoPath);
                await fileHelper.deleteFile(oldFile);
            }
            res.status(500).json({ errorPartnerRoutePo: err.message });
        }
    },
    updatePartner: async (req, res) => {
        const { id } = req.params;
        let { name, description, link } = req.body;
        const logo = req.file;
        try {
            const [rows] = await partnerModel.findById(id);
            if (rows.length === 0) {
                if (logo) {
                    const tempImage = await uploadImage(logo);
                    await fileHelper.deleteFile(path.basename(tempImage));
                }
                return res.status(404).json({ errorPartnerRoutePa1: 'Partner not found' });
            }
            const original = rows[0];
            name = name ?? original.name;
            description = description ?? original.description;
            link = link ?? original.link;

            let logoPath = original.logo;
            if (logo) {
                const oldFile = path.basename(logoPath);
                await fileHelper.deleteFile(oldFile);
                logoPath = await uploadImage(logo);
            }

            const [result] = await partnerModel.update(id, name, description, link, logoPath);
            res.json({ id, name, description, link, logo : logoPath });
        } catch (err) {
            if (logo) {
                const tempImage = await uploadImage(logo);
                await fileHelper.deleteFile(path.basename(tempImage));
            }
            res.status(500).json({ errorPartnerRoutePa2: err.message });
        }
    },
    deletePartner: async (req, res) => {
        const { id } = req.params;
        try {
            const [rows] = await partnerModel.findById(id);
            if (rows.length === 0) {
                return res.status(404).json({ errorPartnerRouteDe1: 'Partner not found' });
            }

            const [result] = await partnerModel.delete(id);
            const imagePath = rows[0].logo;
            if (imagePath) {
                const oldFile = path.basename(imagePath);
                await fileHelper.deleteFile(oldFile);
            }
            
            res.json({ message: 'Partner deleted successfully' });
        } catch (err) {
            res.status(500).json({ errorPartnerRouteDe2: err.message });
        }
    }
};

module.exports = partnerController;