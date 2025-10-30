const db = require('../config/db.js');

const TABLE_NAME = 'logs';

const logsModel = {
    getLogs: (limit) => {
        let SQLQuery = 'SELECT * FROM ' + TABLE_NAME + ' ORDER BY created_at DESC';

        if (!isNaN(limit) && limit > 0) {
            SQLQuery += ' LIMIT ' + limit;
        }
        return db.query(SQLQuery);
    },
    createLog: (id_admin, action, target_table, target_id, description) => {
        return db.query('INSERT INTO ' + TABLE_NAME + ' (id_admin, action, target_table, target_id, description, created_at) VALUES (?, ?, ?, ?, ?, NOW())', 
            [
                id_admin, action, target_table, target_id, description
            ]
        );
    }
};

module.exports = logsModel;