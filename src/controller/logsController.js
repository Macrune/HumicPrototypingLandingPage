const logsModel = require('../models/logsModel.js');

const logsController = {
    getAllLogs: async (req, res) => {
        const { limit } = req.query;
        try {
            const [rows] = await logsModel.getLogs(limit);
            res.json(rows);
        } catch (err) {
            res.status(500).json({ errorLogsRouteGA: err.message });
        }
    }
};

module.exports = logsController;