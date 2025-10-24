const db = require('../config/db.js');

const TABLE_NAME = 'news';

const newsModel = {
    findAll: () => {
        return db.query('SELECT * FROM ' + TABLE_NAME);
    },
    fidAllSorted: (order = 'DESC', limit) => {
        const sortOrder = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
        limit = parseInt(limit, 10) ;
        let SQLQuery = 'SELECT id, title, date, image_path FROM ' + TABLE_NAME + ' ORDER BY date ' + sortOrder;

        if (!isNaN(limit) && limit > 0) {
            SQLQuery += ' LIMIT ' + limit;
        }
        return db.query(SQLQuery);
    },
    findById: (id) => {
        return db.query('SELECT * FROM ' + TABLE_NAME + ' WHERE id = ?', [id]);
    },
    create: (title, content, author, date, image_path) => {
        return db.query('INSERT INTO ' + TABLE_NAME + ' (title, content, author, date, image_path) VALUES (?, ?, ?, ?, ?)', 
            [
                title, content, author, date, image_path
            ]
        );
    },
    update: (id, title, content, author, date, image_path) => {
        return db.query('UPDATE ' + TABLE_NAME + ' SET title = ?, content = ?, author = ?, date = ?, image_path = ? WHERE id = ?',
            [
                title, content, author, date, image_path, id
            ]
        );
    },
    delete: async (id) => {
        return db.query('DELETE FROM ' + TABLE_NAME + ' WHERE id = ?', [id]);
    }
};

module.exports = newsModel;