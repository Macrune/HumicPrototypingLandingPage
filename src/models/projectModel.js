const db = require('../config/db.js');
const { search } = require('../routes/staffRoute.js');

const TABLE_NAME = 'project';
const PROJECT_CATEGORY = 'project_category';
const CATEGORY_TABLE = 'category';

const projectModel = {
    findAll: () => {
        return db.query('SELECT * FROM ' + TABLE_NAME);
    },
    findById: (id) => {
        return db.query('SELECT * FROM ' + TABLE_NAME + ' WHERE id = ?', [id]);
    },
    findBySearch: (searchTerm) => {
        const likeTerm = '%' + searchTerm + '%';
        const SQLQuery = `
        SELECT 
            p.title, p.description
        FROM ${TABLE_NAME} p
        LEFT JOIN ${PROJECT_CATEGORY} pc ON p.id = pc.id_project
        LEFT JOIN ${CATEGORY_TABLE} c ON pc.id_category = c.id
        WHERE
            p.title LIKE ? OR
            p.description LIKE ? OR
            c.name LIKE ?
        `;
        return db.query(SQLQuery, [likeTerm, likeTerm, likeTerm]);
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