const db = require('../config/db.js');

const TABLE_NAME = 'partnership';

const partnerModel = {
    findAll: () => {
        return db.query('SELECT * FROM ' + TABLE_NAME);
    },
    findById: (id) => {
        return db.query('SELECT * FROM ' + TABLE_NAME + ' WHERE id = ?', [id]);
    },
    create: (name, description, link, logo) => {
        return db.query('INSERT INTO ' + TABLE_NAME + ' (name, description, link, logo) VALUES (?, ?, ?, ?)', 
            [
                name,
                description,
                link,
                logo
            ]
        );
    },
    update: (id, name, description, link, logo) => {
        return db.query('UPDATE ' + TABLE_NAME + ' SET name = ?, description = ?, link = ?, logo = ? WHERE id = ?',
            [
                name,
                description,
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