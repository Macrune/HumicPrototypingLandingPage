const express = require('express');
const staffModel = require('../models/staffModel.js');
const multer = require('../middleware/multer.js');
const fileHelper = require('../config/fileHelper.js');
const path = require('path');

const router = express.Router();

// Get all staff members
router.get('/', async (req, res) => {
    try {
        const [rows] = await staffModel.findAll();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ errorStaffRouteGe: err.message });
    }
});

// Get a specific staff member by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await staffModel.findById(id);
        if (rows.length === 0) {
            return res.status(404).json({ errorStaffRouteGI: 'Staff member not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ errorStaffRouteGI: err.message });
    }
});

// Add a new staff member
router.post('/', multer.single('image'), async (req, res) => {
    const {
        nama,
        posisi,
        deskripsi,
        edukasi,
        publikasi,
        email,
        kontak,
        linkedin,
        sosmed
    } = req.body;
    const image = req.file;
    try {
        const imagePath = await uploadImage(image);
        const [result] = await staffModel.create( nama, posisi, deskripsi, edukasi, publikasi, email, kontak, linkedin, sosmed, imagePath );
        res.status(201).json({ id: result.insertId, nama, posisi, deskripsi, edukasi, publikasi, email, kontak, linkedin, sosmed, imagePath });
    } catch (err) {
        res.status(500).json({ errorStaffRoutePo: err.message });
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

// Update a staff member by ID
router.patch('/:id', multer.single('image'), async (req, res) => {
    const { id } = req.params;
    let { nama, posisi, deskripsi, edukasi, publikasi, email, kontak, linkedin, sosmed, image_path } = req.body;
    const image = req.file;
    try {
        const [rows] = await staffModel.findById(id);
        if (rows.length === 0) {
            return res.status(404).json({ errorStaffRouteD: 'Staff member not found' });
        }

        // Use original values if any field is null or undefined
        const original = rows[0];
        nama = nama ?? original.nama;
        posisi = posisi ?? original.posisi;
        deskripsi = deskripsi ?? original.deskripsi;
        edukasi = edukasi ?? original.edukasi;
        publikasi = publikasi ?? original.publikasi;
        email = email ?? original.email;
        kontak = kontak ?? original.kontak;
        linkedin = linkedin ?? original.linkedin;
        sosmed = sosmed ?? original.sosmed;

        let imagepath = original.image_path;
        if (image) {
            const oldFile = path.basename(imagepath);
            await fileHelper.deleteFile(oldFile);
            imagepath = await uploadImage(image);
        }

        const [result] = await staffModel.update(
            id, nama, posisi, deskripsi, edukasi, publikasi, email, kontak, linkedin, sosmed, imagepath
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ errorStaffRoutePa1: 'Staff member not found' });
        }
        res.json({ id, nama, posisi, deskripsi, edukasi, publikasi, email, kontak, linkedin, sosmed, image_path: imagepath });
    } catch (err) {
        res.status(500).json({ errorStaffRoutePa2: err.message });
    }
});

// Delete a staff member by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await staffModel.findById(id);
        if (rows.length === 0) {
            return res.status(404).json({ errorStaffRouteD: 'Staff member not found' });
        }
        const imagePath = rows[0].image_path;
        if (imagePath) {
            const fileName = path.basename(imagePath);
            await fileHelper.deleteFile(fileName);
        }
        const [result] = await staffModel.delete(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ errorStaffRouteD: 'Staff member not found' });
        }
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ errorStaffRouteD: err.message });
    }
});


module.exports = router;