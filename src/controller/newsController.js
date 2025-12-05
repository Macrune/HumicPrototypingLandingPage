const newsModel = require('../models/newsModel.js');
const fileHelper = require('../config/fileHelper.js');
const path = require('path');
const slug = require('../config/slug.js');
const { createLog } = require('../models/logsModel.js');
const { get } = require('http');

const uploadImage = async (image) => {
    try {
        if (!image) {
            throw new Error('No image file provided');
        }
        const filePath = `/${process.env.IMG_DIR}/${image.filename}`;
        return filePath;
    } catch (error) {
        throw new Error('Image upload failed: ' + error.message);
    }
};

const newsController = {
    getAllNews: async (req, res) => {
         const { order = 'DESC', limit } = req.query;
        try {
            const [rows] = await newsModel.fidAllSorted(order, limit);
            res.json(rows);
        } catch (err) {
            res.status(500).json({ errorNewsRouteGS: err.message });
        }
    },
    getNewsById: async (req, res) => {
        const { id } = req.params;
        try {
            const [rows] = await newsModel.findById(id);
            if (rows.length === 0) {
                return res.status(404).json({ errorNewsRouteGI: 'News not found' });
            }
            res.json(rows[0]);
        } catch (err) {
            res.status(500).json({ errorNewsRouteGI: err.message });
        }
    },
    getNewsBySlug: async (req, res) => {
        const { slug } = req.params;
        try {
            const [rows] = await newsModel.findBySlug(slug);
            if (rows.length === 0) {
                return res.status(404).json({ errorNewsRouteGS: 'News not found' });
            }
            res.json(rows[0]);
        } catch (err) {
            res.status(500).json({ errorNewsRouteGS: err.message });
        }
    },
    createNews: async (req, res) => {
        const { title, content, date } = req.body;
        const image = req.file;
        let imagePath = null;
        try {
            if (image) {
                imagePath = await uploadImage(image);
            } else {
                imagePath = null;
            }
            
            const author = req.body.author || req.admin.username;
            const slugTitle = await slug(title, 'news');
            const [result] = await newsModel.create(title, slugTitle, content, author, date, imagePath);
            const adminId = req.admin.id;
            await createLog(adminId, 'CREATE', 'news', result.insertId, `${req.admin.username} Created news with title: ${title}`);
            res.status(201).json({ id: result.insertId, title, slug: slugTitle, content, author, date, image_path : imagePath });
        } catch (err) {
            if (imagePath) {
                const oldFile = path.basename(imagePath);
                await fileHelper.deleteFile(oldFile);
            }
            res.status(500).json({ errorNewsRoutePo: err.message });
        }
    },
    updateNews: async (req, res) => {
        const { id } = req.params;
        let { title, content, date, author } = req.body;
        const image = req.file;
        try {
            const [rows] = await newsModel.findById(id);
            if (rows.length === 0) {
                if (image) {
                    const tempImage = await uploadImage(image);
                    await fileHelper.deleteFile(path.basename(tempImage));
                }
                return res.status(404).json({ errorNewsRoutePa1: 'News not found' });
            }
            const original = rows[0];
            title = title ?? original.title;
            content = content ?? original.content;
            date = date ?? original.date;
            author = author ?? original.author;

            let imagepath = original.image_path;
            if (image) {
                if (imagepath) {
                    const oldFile = path.basename(imagepath);
                    await fileHelper.deleteFile(oldFile);
                    imagepath = await uploadImage(image);
                } else {
                    imagepath = await uploadImage(image);
                }
            }
            const slugTitle = await slug(title, 'news');
            await newsModel.update(id, title, slugTitle, content, author, date, imagepath);
            const adminId = req.admin.id;
            await createLog(adminId, 'UPDATE', 'news', id, `${req.admin.username} Updated news with title: ${title}`);
            res.json({ id, title, slug: slugTitle, content, author, date, image_path : imagepath });
        } catch (err) {
            if (image) {
                const tempImage = await uploadImage(image);
                await fileHelper.deleteFile(path.basename(tempImage));
            }
            res.status(500).json({ errorNewsRoutePa2: err.message });
        }
    },
    deleteNews: async (req, res) => {
        const { id } = req.params;
        try {
            const [rows] = await newsModel.findById(id);
            if (rows.length === 0) {
                return res.status(404).json({ errorNewsRouteDe1: 'News not found' });
            }

            await newsModel.delete(id);
            const imagePath = rows[0].image_path;
            if (imagePath) {
                const oldFile = path.basename(imagePath);
                await fileHelper.deleteFile(oldFile);
            }
            
            const adminId = req.admin.id;
            await createLog(adminId, 'DELETE', 'news', id, `${req.admin.username} Deleted news with title: ${rows[0].title}`);
            res.json({ message: 'News deleted successfully' });
        } catch (err) {
            res.status(500).json({ errorNewsRouteDe2: err.message });
        }
    }
};


module.exports = newsController;