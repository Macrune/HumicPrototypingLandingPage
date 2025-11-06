const db = require('../config/db.js');

const TABLE_NAME = 'banner';

const bannerModel = {
    findAll: () => {
        return db.query('SELECT * FROM ' + TABLE_NAME);
    },
    findById: (id) => {
        return db.query('SELECT * FROM ' + TABLE_NAME + ' WHERE id = ?', [id])
    },
    create: (image_path) => {
        return db.query('INSERT INTO ' + TABLE_NAME + ' (image_path) VALUES (?) ',
            [image_path]
        );
    },
    delete: async (id) => {
        return db.query('DELETE FROM ' + TABLE_NAME + ' WHERE id = ?', [id]);
    }
};

module.exports = bannerModel;
