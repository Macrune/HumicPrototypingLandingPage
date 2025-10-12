const db = require('../config/db.js');

const TABLE_NAME = 'berita';

const beritaModel = {
    findAll: () => {
        return db.query('SELECT * FROM ' + TABLE_NAME);
    },
    findById: (id) => {
        return db.query('SELECT * FROM ' + TABLE_NAME + ' WHERE id = ?', [id]);
    },
    create: (judul, tanggal, isi, penulis, image) => {
        return db.query('INSERT INTO ' + TABLE_NAME + ' (judul, tanggal, isi, penulis, image) VALUES (?, ?, ?, ?, ?)', 
            [
                judul,
                tanggal,
                isi,
                penulis,
                image
            ]
        );
    },
    update: (id, judul, tanggal, isi, penulis, image) => {
        return db.query('UPDATE ' + TABLE_NAME + ' SET judul = ?, tanggal = ?, isi = ?, penulis = ?, image = ? WHERE id = ?',
            [
                judul,
                tanggal,
                isi,
                penulis,
                image,
                id
            ]
        );
    },
    delete: async (id) => {
        return db.query('DELETE FROM ' + TABLE_NAME + ' WHERE id = ?', [id]);
    }
};

module.exports = beritaModel;