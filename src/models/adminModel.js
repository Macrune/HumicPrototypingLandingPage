const db = require('../config/db.js');

const TABLE_NAME = 'admin';

const adminModel = {
    findAll: () => {
        return db.query('SELECT * FROM ' + TABLE_NAME);
    },
    findById: (id) => {
        return db.query('SELECT * FROM ' + TABLE_NAME + ' WHERE id = ?', [id]);
    },
    findByUsername: (username) => {
        return db.query('SELECT * FROM ' + TABLE_NAME + ' WHERE username = ?', [username]);
    },
    create: (username, password_hash) => {
        return db.query('INSERT INTO ' + TABLE_NAME + ' (username, password_hash) VALUES (?, ?)', [username, password_hash]);
    },
    update: (id, username, password_hash) => {
        return db.query('UPDATE ' + TABLE_NAME + ' SET username = ?, password_hash = ? WHERE id = ?', [username, password_hash, id]);
    },
    updateLastLogin: (id) => {
        return db.query('UPDATE ' + TABLE_NAME + ' SET last_login = NOW() WHERE id = ?', [id]);
    },
    updatePassword: (id, password_hash) => {
        return db.query('UPDATE ' + TABLE_NAME + ' SET password_hash = ? WHERE id = ?', [password_hash, id]);
    },
    delete: async (id) => {
        return db.query('DELETE FROM ' + TABLE_NAME + ' WHERE id = ?', [id]);
    }
};

module.exports = adminModel;