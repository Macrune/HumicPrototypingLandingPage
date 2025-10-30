const db = require('../config/db');
const { findById } = require('./agendaModel');

const PROJECT_CATEGORY_TABLE = 'project_category';
const CATEGORY_TABLE = 'category';

const projectCategoryModel = {
    create: (id_project, id_category) => {
        return db.query('INSERT INTO ' + PROJECT_CATEGORY_TABLE + ' (id_project, id_category) VALUES (?, ?)',
            [
                id_project, id_category
            ]
        )
    },
    delete: async (id) => {
        return db.query('DELETE FROM ' + PROJECT_CATEGORY_TABLE + ' WHERE id = ?', [id])
    },
    findById: (id) => {
        return db.query('SELECT * FROM ' + PROJECT_CATEGORY_TABLE + ' WHERE id = ?', [id]);
    },
    getCategoryByProject: (id_project) => {
        const SQLQuery = `
        SELECT
            pc.id, pc.id_category, c.name
        FROM ${PROJECT_CATEGORY_TABLE} pc
        JOIN
            ${CATEGORY_TABLE} c on pc.id_category = c.id
        WHERE
            pc.id_project = ${id_project}
        `;
        return db.query(SQLQuery);
    }
};

module.exports = projectCategoryModel;