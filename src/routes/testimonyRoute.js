const express = require('express');
const testimonyModel = require('../models/testimonyModel.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [rows] = await testimonyModel.findAll();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ errorTestimonyRouteGe: err.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await testimonyModel.findById(id);
        if (rows.length === 0) {
            return res.status(404).json({ errorTestimonyRouteGI: 'Testimony not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ errorTestimonyRouteGI: err.message });
    }
});

router.post('/', async (req, res) => {
    const { id_intern, content } = req.body;
    try {
        const [result] = await testimonyModel.create(id_intern, content);
        res.status(201).json({ id: result.insertId, id_intern, content });
    } catch (err) {
        res.status(500).json({ errorTestimonyRoutePo: err.message });
    }
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { id_intern, content } = req.body;
    try {
        const [result] = await testimonyModel.update(id, id_intern, content);
        if (result.affectedRows === 0) {
            return res.status(404).json({ errorTestimonyRoutePa: 'Testimony not found' });
        }
        res.json({ id, id_intern, content });
    } catch (err) {
        res.status(500).json({ errorTestimonyRoutePa: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await testimonyModel.delete(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ errorTestimonyRouteDe: 'Testimony not found' });
        }
        res.json({ message: 'Testimony deleted successfully' });
    } catch (err) {
        res.status(500).json({ errorTestimonyRouteDe: err.message });
    }
});

module.exports = router;