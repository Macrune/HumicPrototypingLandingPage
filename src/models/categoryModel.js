const db = require('../config/db.js');
const { findById, create } = require('./agendaModel.js');

const TABLE_NAME = 'category';

const categoryModel = {
    findAll: () => {
        return db.query('SELECT * FROM ' + TABLE_NAME);
    },
    findById: (id) => {
        return db.query('SELECT * FROM ' + TABLE_NAME + 'WHERE id = ?', [id]);
    },
    create: (name) => {
        return db.query('INSERT INTO ' + TABLE_NAME + ' (name) VALUES (?)', [name]);
    },
    update: (id, name) => {
        return db.query('UPDATE ' + TABLE_NAME + ' SET name = ? WHERE id = ?', [name, id]);
    },
    delete: async (id) => {
        return db.query('DELETE FROM ' + TABLE_NAME + 'WHERE id = ?', [id]);
    }
};

module.exports = categoryModel;