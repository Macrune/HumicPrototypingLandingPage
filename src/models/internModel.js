const db = require('../config/db.js');

const TABLE_NAME = 'intern';

const internModel = {
    findAll: () => {
        return db.query('SELECT * FROM ' + TABLE_NAME);
    },
    findById: (id) => {
        return db.query('SELECT * FROM ' + TABLE_NAME + ' WHERE id = ?', [id]);
    },
    create: (name, role, university, major, email, contact, linkedin, social_media, image_path) => {
        return db.query('INSERT INTO ' + TABLE_NAME + ' (name, role, university, major, email, contact, linkedin, social_media, image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [
                name, role, university, major, email, contact, linkedin, social_media, image_path
            ]
        );
    },
    update: (id, name, role, university, major, email, contact, linkedin, social_media, image_path) => {
        return db.query('UPDATE ' + TABLE_NAME + ' SET name = ?, role = ?, university = ?, major = ?, email = ?, contact = ?, linkedin = ?, social_media = ?, image_path = ? WHERE id = ?',
            [
                name, role, university, major, email, contact, linkedin, social_media, image_path, id
            ]
        );
    },
    delete: async (id) => {
        return db.query('DELETE FROM ' + TABLE_NAME + ' WHERE id = ?', [id]);
    }
};

module.exports = internModel;