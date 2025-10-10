const db = require('../config/db.js');

const partnerModel = {
    findAll: () => {
        return db.query('SELECT * FROM partnership');
    },
    findById: (id) => {
        return db.query('SELECT * FROM partnership WHERE id = ?', [id]);
    },
    create: (nama, deskripsi, link, logo) => {
        return db.query('INSERT INTO partnership (nama, deskripsi, link, logo) VALUES (?, ?, ?, ?)', 
            [
                nama,
                deskripsi,
                link,
                logo
            ]
        );
    },
    update: (id, nama, deskripsi, link, logo) => {
        return db.query('UPDATE partnership SET nama = ?, deskripsi = ?, link = ?, logo = ? WHERE id = ?',
            [
                nama,
                deskripsi,
                link,
                logo,
                id
            ]
        );
    },
    delete: async (id) => {
        return db.query('DELETE FROM partnership WHERE id = ?', [id]);
    }
};

module.exports = partnerModel;