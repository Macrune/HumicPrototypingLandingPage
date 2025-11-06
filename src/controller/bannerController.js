const bannerModel = require('../models/bannerModel.js');
const fileHelper = require('../config/fileHelper.js');
const path = require('path');
const { createLog } = require('../models/logsModel.js');

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

const bannerController = {
    getAllBanner: async (req, res) => {
        try {
            const [rows] = await bannerModel.findAll();
            res.json(rows);
        }catch (err) {
            res.status(500).json({ errorBannerRouteGA : err.message });
        }
    },
    createBanner: async (req, res) => {
        const image = req.file;
        let imagePath = null;
        try {
            imagePath = await uploadImage(image);
            const [result] = await bannerModel.create(imagePath);
            const adminId = req.admin.id;
            await createLog(adminId, 'CREATE', 'banner', result.insertId, `${req.admin.username} Created banner with id: ${result.insertId}`);
            res.status(201).json({ id: result.insertId, image_path : imagePath });
        }catch (err) {
            if (imagePath) {
                const oldFile = path.basename(imagePath);
                await fileHelper.deleteFile(oldFile);
            }
            res.status(500).json({ errorBannerRoutePo: err.message });
        }
    },
    deleteBanner: async (req, res) => {
        const { id } = req.params;
        try {
            const [rows] = await bannerModel.findById(id);
            if (rows.length === 0) {
                return res.status(404).json({ errorBannerRouteDe1: 'Banner not found' })
            }

            const [result] = await bannerModel.delete(id);
            let imagepath = rows[0].image_path;
            if (imagepath) {
                const oldFile = path.basename(imagepath);
                await fileHelper.deleteFile(oldFile);
            }

            const adminId = req.admin.id;
            await createLog(adminId, 'DELETE', 'banner', id, `${req.admin.username} Deleted banner with id: ${id}`);
            res.json({ message: 'Banner deleted successfully' });
        }catch (err) {
            res.status(500).json({ errorBannerRouteDe2: err.message });
        }
    }
};

module.exports = bannerController;