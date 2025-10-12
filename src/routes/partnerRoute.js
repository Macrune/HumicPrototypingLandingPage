const express = require('express');
const partnerModel = require('../models/partnerModel.js');
const multer = require('../middleware/multer.js');
const fileHelper = require('../config/fileHelper.js');
const path = require('path');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [rows] = await partnerModel.findAll();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await partnerModel.findById(id);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Partner not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', multer.single('logo'), async (req, res) => {
    const { nama, deskripsi, link } = req.body;
    const logo = req.file;
    try {
        const logoPath = await uploadImage(logo);
        const [result] = await partnerModel.create(nama, deskripsi, link, logoPath);
        res.status(201).json({ id: result.insertId, nama, deskripsi, link, logoPath });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const uploadImage = async (image) => {
    try {
        if (!image) {
            throw new Error('No image file provided');
        }

        const filePath = `/img/${image.filename}`;
        return filePath;
    } catch (error) {
        throw new Error('Image upload failed: ' + error.message);
    }
};

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { nama, deskripsi, link } = req.body;
    const logo = req.file;
    try {
        const [rows] = await partnerModel.findById(id);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Partner not found' });
        }
        const original = rows[0];
        nama = nama ?? original.nama;
        deskripsi = deskripsi ?? original.deskripsi;
        link = link ?? original.link;

        let logoPath = original.logo;
        if (logo) {
            const oldFile = path.basename(logoPath);
            await fileHelper.deleteFile(oldFile);
            logoPath = await uploadImage(logo);
        }

        const [result] = await partnerModel.update(id, nama, deskripsi, link, logoPath);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Partner not found' });
        }
        res.json({ id, nama, deskripsi, link, logoPath });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await partnerModel.findById(id);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Partner not found' });
        }
        
        const imagePath = rows[0].logo;
        if (imagePath) {
            const oldFile = path.basename(imagePath);
            await fileHelper.deleteFile(oldFile);
        }

        const [result] = await partnerModel.delete(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Partner not found' });
        }
        res.json({ message: 'Partner deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;