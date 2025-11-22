const db = require('../config/db.js');

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
    findBySlug: (slug) => {
        return db.query('SELECT * FROM ' + TABLE_NAME + ' WHERE slug = ?', [slug]);
    },
    findBySearch: (searchTerm) => {
        const likeTerm = '%' + searchTerm + '%';
        const SQLQuery = `
        SELECT 
            p.title, p.slug, p.description
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
    findBySearchInternship: (searchTerm) => {
        const likeTerm = '%' + searchTerm + '%';
        const SQLQuery = `
        SELECT 
            p.title, p.slug, p.description
        FROM ${TABLE_NAME} p
        LEFT JOIN ${PROJECT_CATEGORY} pc ON p.id = pc.id_project
        LEFT JOIN ${CATEGORY_TABLE} c ON pc.id_category = c.id
        WHERE
            c.name = 'Internship' AND (
                p.title LIKE ? OR
                p.description LIKE ? OR
                c.name LIKE ?
            )  
        `;
        return db.query(SQLQuery, [likeTerm, likeTerm, likeTerm]);
    },
    findBySearchResearchship: (searchTerm) => {
        const likeTerm = '%' + searchTerm + '%';
        const SQLQuery = `
        SELECT 
            p.title, p.slug, p.description
        FROM ${TABLE_NAME} p
        LEFT JOIN ${PROJECT_CATEGORY} pc ON p.id = pc.id_project
        LEFT JOIN ${CATEGORY_TABLE} c ON pc.id_category = c.id
        WHERE
            c.name = 'Researchship' AND (
                p.title LIKE ? OR
                p.description LIKE ? OR
                c.name LIKE ?
            )  
        `;
        return db.query(SQLQuery, [likeTerm, likeTerm, likeTerm]);
    },
    create: (title, slug, description, publication, link, image_path) => {
        return db.query('INSERT INTO ' + TABLE_NAME + ' (title, slug, description, publication, link, image_path) VALUES (?, ?, ?, ?, ?, ?)',
            [
                title, slug, description, publication, link, image_path
            ]
        );
    },
    update: (id, title, slug, description, publication, link, image_path) => {
        return db.query('UPDATE ' + TABLE_NAME + ' SET title = ?, slug = ?, description = ?, publication = ?, link = ?, image_path = ? WHERE id = ?',
            [
                title, slug, description, publication, link, image_path, id
            ]
        );
    },
    delete: async (id) => {
        return db.query('DELETE FROM ' + TABLE_NAME + ' WHERE id = ?', [id]);
    }
};

module.exports = projectModel;