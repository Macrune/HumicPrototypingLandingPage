const db = require('../config/db');

const PROJECT_MEMBER_TABLE = 'project_member';
const INTERN_TABLE = 'intern'

const projectMemberModel = {
    create: (id_project, id_intern) => {
        return db.query('INSERT INTO ' + PROJECT_MEMBER_TABLE + ' (id_project, id_intern) VALUES (?, ?)',
            [
                id_project, id_intern
            ]
        )
    },
    delete: async (id) => {
        return db.query('DELETE FROM ' + PROJECT_MEMBER_TABLE + ' WHERE id = ?', [id]);
    },
    getMemberByProject: (id_project) => {
        const SQLQuery = `
        SELECT
            pm.id, pm.id_intern,
            i.name, i.role
            FROM ${PROJECT_MEMBER_TABLE} pm
            JOIN
                ${INTERN_TABLE} i on pm.id_intern = i.id
            WHERE
                pm.id_project = ${id_project}
        `;
        return db.query(SQLQuery);
    }
};

module.exports = projectMemberModel;