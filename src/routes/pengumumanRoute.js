const express = require('express');
const pengumumanModel = require('../models/pengumumanModel.js');
const multer = require('../middleware/multer.js');
const fileHelper = require('../config/fileHelper.js');
const path = require('path');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [rows] = await pengumumanModel.findAll();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ errorPengumumanRouteGe: err.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pengumumanModel.findById(id);
        if (rows.length === 0) {
            return res.status(404).json({ errorPengumumanRouteGI: 'Pengumuman not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ errorPengumumanRouteGI: err.message });
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

router.post('/', multer.single('image'), async (req, res) => {
    const { isi, tanggal} = req.body;
    const image = req.file;
    try {
        const imagePath = await uploadImage(image);
        const [result] = await pengumumanModel.create(isi, tanggal, imagePath);
        res.status(201).json({ id: result.insertId, isi, tanggal, imagePath });
    } catch (err) {
        res.status(500).json({ errorPengumumanRoutePo: err.message });
    }
});

router.patch('/:id', multer.single('image'), async (req, res) => {
    const { id } = req.params;
    let { isi, tanggal } = req.body;
    const image = req.file;
    try {
        const [rows] = await pengumumanModel.findById(id);
        if (rows.length === 0) {
            return res.status(404).json({ errorPengumumanRoutePa1: 'Pengumuman not found' });
        }
        const original = rows[0];
        isi = isi ?? original.isi;
        tanggal = tanggal ?? original.tanggal;
        
        let imagepath = original.image_path;
        if (image) {
            const oldFile = path.basename(imagepath);
            await fileHelper.deleteFile(oldFile);
            imagepath = await uploadImage(image);
        }
        await pengumumanModel.update(id, isi ?? original.isi, tanggal ?? original.tanggal, imagepath);
        res.json({ id, isi: isi ?? original.isi, tanggal: tanggal ?? original.tanggal, imagepath });
    } catch (err) {
        res.status(500).json({ errorPengumumanRoutePa2: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pengumumanModel.findById(id);
        if (rows.length === 0) {
            return res.status(404).json({ errorPengumumanRouteDe1: 'Pengumuman not found' });
        }

        let imagepath = rows[0].image_path;
        if (imagepath) {
            const oldFile = path.basename(imagepath);
            await fileHelper.deleteFile(oldFile);
        }

        await pengumumanModel.delete(id);
        res.json({ message: 'Pengumuman deleted successfully' });
    } catch (err) {
        res.status(500).json({ errorPengumumanRouteDe2: err.message });
    }
});

module.exports = router;