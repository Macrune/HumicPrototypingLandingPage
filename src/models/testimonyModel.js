const db = require('../config/db.js');

const TESTIMONY_TABLE = 'testimony';
const INTERN_TABLE = 'intern';

const testimonyModel = {
    findAll: () => {
        const SQLQuery = `
        SELECT 
            t.id,
            t.id_intern,
            i.name,
            i.role,
            i.university,
            t.content,
            t.rating
            FROM ${TESTIMONY_TABLE} t
            JOIN 
                ${INTERN_TABLE} i on t.id_intern = i.id
        `;
        return db.query(SQLQuery);
    },
    findById: (id) => {
        const SQLQuery = `
        SELECT 
            t.id,
            t.id_intern,
            i.name,
            i.role,
            i.university,
            t.content,
            t.rating
            FROM ${TESTIMONY_TABLE} t
            JOIN 
                ${INTERN_TABLE} i on t.id_intern = i.id
            WHERE
                t.id = ${id}
        `;
        return db.query(SQLQuery);
    },
    create: (id_intern, content, rating) => {
        return db.query('INSERT INTO ' + TESTIMONY_TABLE + ' (id_intern, content, rating) VALUES (?, ?, ?)', 
            [
                id_intern, content, rating
            ]
        );
    },
    update: (id, id_intern, content, rating) => {
        return db.query('UPDATE ' + TESTIMONY_TABLE + ' SET id_intern = ?, content = ? WHERE id = ?',
            [
                id_intern, content, rating, id
            ]
        );
    },
    delete: async (id) => {
        return db.query('DELETE FROM ' + TESTIMONY_TABLE + ' WHERE id = ?', [id]);
    }
};

module.exports = testimonyModel;