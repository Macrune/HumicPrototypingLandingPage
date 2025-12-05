const statisticModel = require('../models/statisticModel');
const { createLog } = require('../models/logsModel.js');

const statisticController = {
    getAllStatistics: async (req, res) => {
        try {
            const [rows] = await statisticModel.findAll();
            res.json(rows);
        } catch (err) {
            res.status(500).json({ errorStatisticRouteGS: err.message });
        }
    },
    getStatisticById: async (req, res) => {
        const { id } = req.params;
        try {
            const [rows] = await statisticModel.findById(id);
            if (rows.length === 0) {
                return res.status(404).json({ errorStatisticRouteGI: 'Statistic data not found' });
            }
            res.json(rows[0]);
        } catch (err) {
            res.status(500).json({ errorStatisticRouteGI: err.message });
        }
    },
    createStatistic: async (req, res) => {
        const { name, value } = req.body;
        try {
            const [result] = await statisticModel.create(name, value);

            const adminId = req.admin.id;
            await createLog(adminId, 'CREATE', 'statistic_data', result.insertId, `${req.admin.username} Created statistic data with name: ${name}`);
            res.status(201).json({ id: result.insertId, name, value });
        } catch (err) {
            res.status(500).json({ errorStatisticRoutePo: err.message });
        }
    },
    updateStatistic: async (req, res) => {
        const { id } = req.params;
        const { name, value } = req.body;
        try {
            const [rows] = await statisticModel.findById(id);
            if (rows.length === 0) {
                return res.status(404).json({ errorStatisticRouteUI: 'Statistic data not found' });
            }

            const original = rows[0];
            const updatedName = name ?? original.name;
            const updatedValue = value ?? original.value;
            await statisticModel.update(id, updatedName, updatedValue);

            const adminId = req.admin.id;
            await createLog(adminId, 'UPDATE', 'statistic_data', id, `${req.admin.username} Updated statistic data with id: ${id}`);
            
            res.json({ id, name: updatedName, value: updatedValue });
        } catch (err) {
            res.status(500).json({ errorStatisticRouteUI: err.message });
        }
    },
    deleteStatistic: async (req, res) => {
        const { id } = req.params;
        try {
            const [result] = await statisticModel.delete(id);
            if (result.affectedRows === 0) {
                return res.status(404).json({ errorStatisticRouteDI: 'Statistic data not found' });
            }
            const adminId = req.admin.id;
            await createLog(adminId, 'DELETE', 'statistic_data', id, `${req.admin.username} Deleted statistic data with id: ${id}`);
            res.json({ message: 'Statistic data deleted successfully' });
        } catch (err) {
            res.status(500).json({ errorStatisticRouteDI: err.message });
        }
    }
};

module.exports = statisticController;