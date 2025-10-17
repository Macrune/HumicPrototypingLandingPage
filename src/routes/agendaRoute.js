const express = require('express');
const agendaModel = require('../models/agendaModel.js');
const multer = require('../middleware/multer.js');
const fileHelper = require('../config/fileHelper.js');
const path = require('path');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [rows] = await agendaModel.findAll();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ errorAgendaRouteGe: err.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await agendaModel.findById(id);
        if (rows.length === 0) {
            return res.status(404).json({ errorAgendaRouteGI: 'Agenda not found' });
        } 
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ errorAgendaRouteGI: err.message });
    }
});

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

router.post('/', multer.single('image'), async (req, res) => {
    const { title, content, date } = req.body;
    const image = req.file;
    let imagePath = null;
    try {
        imagePath = await uploadImage(image);
        const [result] = await agendaModel.create(title, content, date, imagePath);
        res.status(201).json({ id: result.insertId, title, content, date, image_path : imagePath });
    } catch (err) {
        if (imagePath) {
            const oldFile = path.basename(imagePath);
            await fileHelper.deleteFile(oldFile);
        }
        res.status(500).json({ errorAgendaRoutePo: err.message });
    }
});

router.patch('/:id', multer.single('image'), async (req, res) => {
    const { id } = req.params;
    let { title, content, date } = req.body;
    const image = req.file;
    try {
        const [rows] = await agendaModel.findById(id);
        if (rows.length === 0) {
            return res.status(404).json({ errorAgendaRoutePa1: 'Agenda not found' });
        }
        const original = rows[0];

        let imagepath = original.image_path;
        if (image) {
            const oldFile = path.basename(imagepath);
            await fileHelper.deleteFile(oldFile);
            imagepath = await uploadImage(image);
        }
        await agendaModel.update(id, title ?? original.title, content ?? original.content, date ?? original.date, imagepath);
        res.json({ id, title: title ?? original.title, content: content ?? original.content, date: date ?? original.date, image_path : imagepath });
    } catch (err) {
        res.status(500).json({ errorAgendaRoutePa2: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await agendaModel.findById(id);
        if (rows.length === 0) {
            return res.status(404).json({ errorAgendaRouteDe1: 'Agenda not found' });
        }
        let imagepath = rows[0].image_path;
        if (imagepath) {
            const oldFile = path.basename(imagepath);
            await fileHelper.deleteFile(oldFile);
        }
        const [result] = await agendaModel.delete(id);
        res.json({ message: 'Agenda deleted successfully' });
    } catch (err) {
        res.status(500).json({ errorAgendaRouteDe2: err.message });
    }
});

module.exports = router;