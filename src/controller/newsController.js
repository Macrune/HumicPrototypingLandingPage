const newsModel = require('../models/newsModel.js');
const multer = require('../middleware/multer.js');
const fileHelper = require('../config/fileHelper.js');
const path = require('path');

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
        try {
            const [rows] = await newsModel.findAll();
            res.json(rows);
        } catch (err) {
            res.status(500).json({ errorNewsRouteGe: err.message });
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
    createNews: async (req, res) => {
        const { title, content, date } = req.body;
        const image = req.file;
        let imagePath = null;
        try {
            imagePath = await uploadImage(image);
            const author = req.body.author || 'Admin';
            const [result] = await newsModel.create(title, content, author, date, imagePath);
            res.status(201).json({ id: result.insertId, title, content, author, date, image_path : imagePath });
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
                const oldFile = path.basename(imagepath);
                await fileHelper.deleteFile(oldFile);
                imagepath = await uploadImage(image);
            }
            await newsModel.update(id, title, content, author, date, imagepath);
            res.json({ id, title, content, author, date, image_path : imagepath });
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
            const imagePath = rows[0].image_path;
            if (imagePath) {
                const oldFile = path.basename(imagePath);
                await fileHelper.deleteFile(oldFile);
            }
            await newsModel.delete(id);
            res.json({ message: 'News deleted successfully' });
        } catch (err) {
            res.status(500).json({ errorNewsRouteDe2: err.message });
        }
    }
};


module.exports = newsController;