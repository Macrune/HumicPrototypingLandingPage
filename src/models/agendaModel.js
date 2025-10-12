const db = require('../config/db.js');

const TABLE_NAME = 'agenda';

const agendaModel = {
    findAll: () => {
        return db.query('SELECT * FROM ' + TABLE_NAME);
    },
    findById: (id) => {
        return db.query('SELECT * FROM ' + TABLE_NAME + ' WHERE id = ?', [id]);
    },
    create: (isi, tanggal, image_path) => {
        return db.query('INSERT INTO ' + TABLE_NAME + ' (isi, tanggal, image_path) VALUES (?, ?, ?)', 
            [
                isi, tanggal, image_path
            ]
        );
    },
    update: (id, isi, tanggal, image_path) => {
        return db.query('UPDATE ' + TABLE_NAME + ' SET isi = ?, tanggal = ?, image_path = ? WHERE id = ?',
            [
                isi, tanggal, image_path, id
            ]
        );
    },
    delete: async (id) => {
        return db.query('DELETE FROM ' + TABLE_NAME + ' WHERE id = ?', [id]);
    }
};

module.exports = agendaModel;