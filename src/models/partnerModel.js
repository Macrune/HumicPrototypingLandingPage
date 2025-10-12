const db = require('../config/db.js');

const TABLE_NAME = 'partnership';

const partnerModel = {
    findAll: () => {
        return db.query('SELECT * FROM ' + TABLE_NAME);
    },
    findById: (id) => {
        return db.query('SELECT * FROM ' + TABLE_NAME + ' WHERE id = ?', [id]);
    },
    create: (nama, deskripsi, link, logo) => {
        return db.query('INSERT INTO ' + TABLE_NAME + ' (nama, deskripsi, link, logo) VALUES (?, ?, ?, ?)', 
            [
                nama,
                deskripsi,
                link,
                logo
            ]
        );
    },
    update: (id, nama, deskripsi, link, logo) => {
        return db.query('UPDATE ' + TABLE_NAME + ' SET nama = ?, deskripsi = ?, link = ?, logo = ? WHERE id = ?',
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
        return db.query('DELETE FROM ' + TABLE_NAME + ' WHERE id = ?', [id]);
    }
};

module.exports = partnerModel;