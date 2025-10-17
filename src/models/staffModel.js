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
        name,
        position,
        description,
        education,
        publication,
        email,
        linkedin,
        sosmed,
        image_path
    ) => {
        return db.query('INSERT INTO ' + TABLE_NAME + ' (name, position, description, education, publication, email, linkedin, sosmed, image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [
                name,
                position,
                description,
                education,
                publication,
                email,
                linkedin,
                sosmed,
                image_path
            ]
        );
    },
    update: (
        id,
        name,
        position,
        description,
        education,
        publication,
        email,
        linkedin,
        sosmed,
        image_path
    ) => {
        return db.query('UPDATE ' + TABLE_NAME + ' SET name = ?, postion = ?, description = ?, education = ?, publication = ?, email = ?, linkedin = ?, sosmed = ?, image_path = ? WHERE id = ?', 
            [
                name,
                position,
                description,
                education,
                publication,
                email,
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

