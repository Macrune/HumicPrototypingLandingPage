const db = require('../config/db.js');

const TABLE_NAME = 'pengumuman';

const pengumumanModel = {
    findAll: () => {
        return db.query('SELECT * FROM ' + TABLE_NAME);
    },
    findById: (id) => {
        return db.query('SELECT * FROM ' + TABLE_NAME + ' WHERE id = ?', [id]);
    },
    create: (isi, tanggal) => {
        return db.query('INSERT INTO ' + TABLE_NAME + ' (isi, tanggal) VALUES (?, ?)', 
            [isi, tanggal]
        );
    },
    update: (id, isi, tanggal) => {
        return db.query('UPDATE ' + TABLE_NAME + ' SET isi = ?, tanggal = ? WHERE id = ?',
            [isi, tanggal, id]
        );
    },
    delete: async (id) => {
        return db.query('DELETE FROM ' + TABLE_NAME + ' WHERE id = ?', [id]);
    }
};

module.exports = pengumumanModel;