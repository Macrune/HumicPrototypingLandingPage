const db = require('../config/db.js');

const TABLE_NAME = 'statistic_data';

const statisticModel = {
    findAll: () => {
        return db.query('SELECT * FROM ' + TABLE_NAME);
    },
    findById: (id) => {
        return db.query('SELECT * FROM ' + TABLE_NAME + ' WHERE id = ?', [id]);
    },
    create: (name, value) => {
        return db.query('INSERT INTO ' + TABLE_NAME + ' (name, value) VALUES (?, ?)', 
            [ name, value ]
        );
    },
    update: (id, name, value) => {
        return db.query('UPDATE ' + TABLE_NAME + ' SET name = ?, value = ? WHERE id = ?',
            [ name, value, id ]
        );
    },
    delete: async (id) => {
        return db.query('DELETE FROM ' + TABLE_NAME + ' WHERE id = ?', [id]);
    }
};

module.exports = statisticModel;