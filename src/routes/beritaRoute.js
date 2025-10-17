const express = require('express');
const beritaModel = require('../models/beritaModel.js');
const multer = require('../middleware/multer.js');
const fileHelper = require('../config/fileHelper.js');
const path = require('path');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [rows] = await beritaModel.findAll();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ errorBeritaRouteGe: err.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await beritaModel.findById(id);
        if (rows.length === 0) {
            return res.status(404).json({ errorBeritaRouteGI: 'Berita not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ errorBeritaRouteGI: err.message });
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
    const { title, content, date } = req.body;
    const image = req.file;
    try {
        const imagePath = await uploadImage(image);
        const author = req.body.author || 'Admin';
        const [result] = await beritaModel.create(title, content, author, date, imagePath);
        res.status(201).json({ id: result.insertId, title, content, author, date, imagePath });
    } catch (err) {
        res.status(500).json({ errorBeritaRoutePo: err.message });
    }
});

router.patch('/:id', multer.single('image'), async (req, res) => {
    const { id } = req.params;
    let { title, content, date, author } = req.body;
    const image = req.file;
    try {
        const [rows] = await beritaModel.findById(id);
        if (rows.length === 0) {
            return res.status(404).json({ errorBeritaRoutePa1: 'Berita not found' });
        }
        const original = rows[0];
        title = title ?? original.title;
        content = content ?? original.content;
        date = date ?? original.date;
        author = author ?? original.author;

        let imagepath = original.image_path;
        if (image) {
            const oldFile = path.basename(imagepath);
            await fileHelper.deleteFile(oldFile);
            imagepath = await uploadImage(image);
        }
        await beritaModel.update(id, title, content, author, date, imagepath);
        res.json({ id, title, content, author, date, imagepath });
    } catch (err) {
        res.status(500).json({ errorBeritaRoutePa2: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await beritaModel.findById(id);
        if (rows.length === 0) {
            return res.status(404).json({ errorBeritaRouteDe1: 'Berita not found' });
        }
        const imagePath = rows[0].image_path;
        if (imagePath) {
            const oldFile = path.basename(imagePath);
            await fileHelper.deleteFile(oldFile);
        }
        await beritaModel.delete(id);
        res.json({ message: 'Berita deleted successfully' });
    } catch (err) {
        res.status(500).json({ errorBeritaRouteDe2: err.message });
    }
});

module.exports = router;