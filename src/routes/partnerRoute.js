const express = require('express');
const partnerModel = require('../models/partnerModel.js');

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

router.post('/', async (req, res) => {
    const { nama, deskripsi, link, logo } = req.body;
    try {
        const [result] = await partnerModel.create(nama, deskripsi, link, logo);
        res.status(201).json({ id: result.insertId, nama, deskripsi, link, logo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { nama, deskripsi, link, logo } = req.body;
    try {
        const [result] = await partnerModel.update(id, nama, deskripsi, link, logo);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Partner not found' });
        }
        res.json({ id, nama, deskripsi, link, logo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
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