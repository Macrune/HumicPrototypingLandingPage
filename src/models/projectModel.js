const db = require('../config/db.js');

const TABLE_NAME = 'project';

const projectModel = {
    findAll: () => {
        return db.query('SELECT * FROM ' + TABLE_NAME);
    },
    findById: (id) => {
        return db.query('SELECT * FROM ' + TABLE_NAME + ' WHERE id = ?', [id]);
    },
    create: (title, description, publication, link, image_path) => {
        return db.query('INSERT INTO ' + TABLE_NAME + ' (title, description, publication, link, image_path) VALUES (?, ?, ?, ?, ?)',
            [
                title, description, publication, link, image_path
            ]
        );
    },
    update: (id, title, description, publication, link, image_path) => {
        return db.query('UPDATE ' + TABLE_NAME + ' SET title = ?, description = ?, publication = ?, link = ?, image_path = ? WHERE id = ?',
            [
                title, description, publication, link, image_path, id
            ]
        );
    },
    delete: async (id) => {
        return db.query('DELETE FROM ' + TABLE_NAME + ' WHERE id = ?', [id]);
    }
};

module.exports = projectModel;