const db = require('../config/db.js');

const TABLE_NAME = 'staff';

const staffModel = {
    findAll: () => {
        return db.query('SELECT * FROM ' + TABLE_NAME);
    },
    findById: (id) => {
        return db.query('SELECT * FROM ' + TABLE_NAME +' WHERE id = ?', [id]);
    },
    create: (
        nama,
        posisi,
        deskripsi,
        edukasi,
        publikasi,
        email,
        kontak,
        linkedin,
        sosmed,
        image_path
    ) => {
        return db.query('INSERT INTO ' + TABLE_NAME + ' (nama, posisi, deskripsi, edukasi, publikasi, email, kontak, linkedin, sosmed, image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [
                nama,
                posisi,
                deskripsi,
                edukasi,
                publikasi,
                email,
                kontak,
                linkedin,
                sosmed,
                image_path
            ]
        );
    },
    update: (
        id,
        nama,
        posisi,
        deskripsi,
        edukasi,
        publikasi,
        email,
        kontak,
        linkedin,
        sosmed,
        image_path
    ) => {
        return db.query('UPDATE ' + TABLE_NAME + ' SET nama = ?, posisi = ?, deskripsi = ?, edukasi = ?, publikasi = ?, email = ?, kontak = ?, linkedin = ?, sosmed = ?, image_path = ? WHERE id = ?', 
            [
                nama,
                posisi,
                deskripsi,
                edukasi,
                publikasi,
                email,
                kontak,
                linkedin,
                sosmed,
                image_path, 
                id
            ]
        );
    },
    delete: async (id) => {
        return db.query('DELETE FROM ' + TABLE_NAME + ' WHERE id = ?', [id]);
    } 
};

module.exports = staffModel;

