const announcementModel = require('../models/announcementModel.js');
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

const announcementController = {
    getAllAnnouncements: async (req, res) => {
        const { order = 'DESC', limit } = req.query;
        try {
            const [rows] = await announcementModel.fidAllSorted(order, limit);
            res.json(rows);
        } catch (err) {
            res.status(500).json({ errorAnnouncementRouteGS: err.message });
        }
    },
    getAnnouncementById: async (req, res) => {
        const { id } = req.params;
        try {
            const [rows] = await announcementModel.findById(id);
            if (rows.length === 0) {
                return res.status(404).json({ errorAnnouncementRouteGI: 'Announcement not found' });
            }
            res.json(rows[0]);
        } catch (err) {
            res.status(500).json({ errorAnnouncementRouteGI: err.message });
        }
    },
    createAnnouncement: async (req, res) => {
        const { title, content, date} = req.body;
        const image = req.file;
        let imagePath = null;
        try {
            imagePath = await uploadImage(image);
            const [result] = await announcementModel.create(title, content, date, imagePath);
            res.status(201).json({ id: result.insertId, title, content, date, image_path : imagePath });
        } catch (err) {
            if (imagePath) {
                const oldFile = path.basename(imagePath);
                await fileHelper.deleteFile(oldFile);
            }
            res.status(500).json({ errorAnnouncementRoutePo: err.message });
        }
    },
    updateAnnouncement: async (req, res) => {
        const { id } = req.params;
        let { title, content, date } = req.body;
        const image = req.file;
        try {
            const [rows] = await announcementModel.findById(id);
            if (rows.length === 0) {
                if (image) {
                    const tempImage = await uploadImage(image);
                    await fileHelper.deleteFile(path.basename(tempImage));
                }
                return res.status(404).json({ errorAnnouncementRoutePa1: 'Announcement not found' });
            }
            const original = rows[0];
            title = title ?? original.title;
            content = content ?? original.content;
            date = date ?? original.date;
            
            let imagepath = original.image_path;
            if (image) {
                const oldFile = path.basename(imagepath);
                await fileHelper.deleteFile(oldFile);
                imagepath = await uploadImage(image);
            }
            await announcementModel.update(id, title, content, date, imagepath);
            res.json({ id, title, content, date, image_path : imagepath });
        } catch (err) {
            if (image) {
                const tempImage = await uploadImage(image);
                await fileHelper.deleteFile(path.basename(tempImage));
            }
            res.status(500).json({ errorAnnouncementRoutePa2: err.message });
        }
    },
    deleteAnnouncement: async (req, res) => {
        const { id } = req.params;
        try {
            const [rows] = await announcementModel.findById(id);
            if (rows.length === 0) {
                return res.status(404).json({ errorAnnouncementRouteDe1: 'Announcement not found' });
            }

            await announcementModel.delete(id);
            let imagepath = rows[0].image_path;
            if (imagepath) {
                const oldFile = path.basename(imagepath);
                await fileHelper.deleteFile(oldFile);
            }

            res.json({ message: 'Announcement deleted successfully' });
        } catch (err) {
            res.status(500).json({ errorAnnouncementRouteDe2: err.message });
        }
    }
};

module.exports = announcementController;