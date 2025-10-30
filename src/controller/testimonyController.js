const testimonyModel = require('../models/testimonyModel.js');
const { createLog } = require('../models/logsModel.js');

const testimonyController = {
    getAllTestimonies: async (req, res) => {
        try {
            const [rows] = await testimonyModel.findAll();
            res.json(rows);
        } catch (err) {
            res.status(500).json({ errorTestimonyRouteGe: err.message });
        }
    },
    getTestimonyById: async (req, res) => {
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
    },
    createTestimony: async (req, res) => {
        const { id_intern, content, rating } = req.body;
        try {
            const [result] = await testimonyModel.create(id_intern, content, rating);
            const adminId = req.admin.id;
            await createLog(adminId, 'CREATE', 'testimony', result.insertId, `Created testimony with id: ${result.insertId}`);
            res.status(201).json({ id: result.insertId, id_intern, content, rating });
        } catch (err) {
            res.status(500).json({ errorTestimonyRoutePo: err.message });
        }
    },
    updateTestimony: async (req, res) => {
        const { id } = req.params;
        let { id_intern, content, rating } = req.body;
        try {
            const [rows] = await testimonyModel.findById(id);
            if (rows.affectedRows === 0) {
                return res.status(404).json({ errorTestimonyRoutePa: 'Testimony not found' });
            }
            const original = rows[0];
            id_intern = id_intern ?? original.id_intern;
            content = content ?? original.content;
            rating = rating ?? original.rating;
            await testimonyModel.update(id, id_intern, content, rating);
            const adminId = req.admin.id;
            await createLog(adminId, 'UPDATE', 'testimony', id, `Updated testimony with id: ${id}`);
            res.json({ id, id_intern, content, rating });
        } catch (err) {
            res.status(500).json({ errorTestimonyRoutePa: err.message });
        }
    },
    deleteTestimony: async (req, res) => {
        const { id } = req.params;
        try {
            const [result] = await testimonyModel.delete(id);
            if (result.affectedRows === 0) {
                return res.status(404).json({ errorTestimonyRouteDe: 'Testimony not found' });
            }

            const adminId = req.admin.id;
            await createLog(adminId, 'DELETE', 'testimony', id, `Deleted testimony with id: ${id}`);
            res.json({ message: 'Testimony deleted successfully' });
        } catch (err) {
            res.status(500).json({ errorTestimonyRouteDe: err.message });
        }
    }
};

module.exports = testimonyController;