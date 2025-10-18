const express = require('express');
const internModel = require('../models/internModel.js');
const multer = require('../middleware/multer.js');
const fileHelper = require('../config/fileHelper.js');
const path = require('path');
const { route } = require('./agendaRoute.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [rows] = await internModel.findAll();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ errorInternRouteGe: err.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await internModel.findById(id);
        if (rows.length === 0) {
            return res.status(404).json({ errorInternRouteGI: 'Intern not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ errorInternRouteGI: err.message });
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
    const { name, role, university, major, email, contact, linkedin, social_media, start_date, end_date } = req.body;
    const image = req.file;
    let imagePath = null;
    try {
        imagePath = await uploadImage(image);
        const [result] = await internModel.create(name, role, university, major, email, contact, linkedin, social_media, start_date, end_date, imagePath);
        res.status(201).json({ id: result.insertId, name, role, university, major, email, contact, linkedin, social_media, start_date, end_date, image_path : imagePath });
    } catch (err) {
        if (imagePath) {
            const oldFile = path.basename(imagePath);
            await fileHelper.deleteFile(oldFile);
        }
        res.status(500).json({ errorInternRoutePo: err.message });
    }
});

router.patch('/:id', multer.single('image'), async (req, res) => {
    const { id } = req.params;
    let { name, role, university, major, email, contact, linkedin, social_media, start_date, end_date } = req.body;
    const image = req.file;
    try {
        const [rows] = await internModel.findById(id);
        if (rows.length === 0) {
            return res.status(404).json({ errorInternRoutePa1: 'Intern not found' });
        }

        const original = rows[0];
        name = name ?? original.name;
        role = role ?? original.role;
        university = university ?? original.university;
        major = major ?? original.major;
        email = email ?? original.email;
        contact = contact ?? original.contact;
        linkedin = linkedin ?? original.linkedin;
        social_media = social_media ?? original.social_media;
        start_date = start_date ?? original.start_date;
        end_date = end_date ?? original.end_date;

        let imagePath = original.image_path;
        if (image) {
            const oldFile = path.basename(original.image_path);
            await fileHelper.deleteFile(oldFile);
            imagePath = await uploadImage(image);
        }
        await internModel.update(id, name, role, university, major, email, contact, linkedin, social_media, start_date, end_date, imagePath);
        res.json({ id, name, role, university, major, email, contact, linkedin, social_media, start_date, end_date, image_path : imagePath });
    } catch (err) {
        res.status(500).json({ errorInternRoutePa2: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await internModel.findById(id);
        if (rows.length === 0) {
            return res.status(404).json({ errorInternRouteDe1: 'Intern not found' });
        }
        const imagePath = rows[0].image_path;
        if (imagePath) {
            const fileName = path.basename(imagePath);
            await fileHelper.deleteFile(fileName);
        }
        const [result] = await internModel.delete(id);
        res.json({ message: 'Intern deleted successfully' });
    } catch (err) {
        res.status(500).json({ errorInternRouteDe2: err.message });
    }
});

module.exports = router;

