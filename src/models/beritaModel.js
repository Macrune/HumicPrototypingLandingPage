const db = require('../config/db.js');

const TABLE_NAME = 'berita';

const beritaModel = {
    findAll: () => {
        return db.query('SELECT * FROM ' + TABLE_NAME);
    },
    findById: (id) => {
        return db.query('SELECT * FROM ' + TABLE_NAME + ' WHERE id = ?', [id]);
    },
    create: (judul, tanggal, isi, penulis, image_path) => {
        return db.query('INSERT INTO ' + TABLE_NAME + ' (judul, tanggal, isi, penulis, image_path) VALUES (?, ?, ?, ?, ?)', 
            [
                judul,
                tanggal,
                isi,
                penulis,
                image_path
            ]
        );
    },
    update: (id, judul, tanggal, isi, penulis, image_path) => {
        return db.query('UPDATE ' + TABLE_NAME + ' SET judul = ?, tanggal = ?, isi = ?, penulis = ?, image_path = ? WHERE id = ?',
            [
                judul,
                tanggal,
                isi,
                penulis,
                image_path,
                id
            ]
        );
    },
    delete: async (id) => {
        return db.query('DELETE FROM ' + TABLE_NAME + ' WHERE id = ?', [id]);
    }
};

module.exports = beritaModel;