const db = require('../config/db.js');
const fileHelper = require('../config/fileHelper.js');

const staffModel = {
    findAll: () => {
        return db.query('SELECT * FROM staff');
    },
    findById: (id) => {
        return db.query('SELECT * FROM staff WHERE id = ?', [id]);
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
        return db.query('INSERT INTO staff (nama, posisi, deskripsi, edukasi, publikasi, email, kontak, linkedin, sosmed, image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
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
        return db.query('UPDATE staff SET nama = ?, posisi = ?, deskripsi = ?, edukasi = ?, publikasi = ?, email = ?, kontak = ?, linkedin = ?, sosmed = ?, image_path = ? WHERE id = ?', 
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
        return db.query('DELETE FROM staff WHERE id = ?', [id]);
    } 
};

module.exports = staffModel;

