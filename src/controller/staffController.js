const staffModel = require('../models/staffModel.js');
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

const staffController = {
    getAllStaff: async (req, res) => {
        const { limit } = req.query;
        try {
            const [rows] = await staffModel.findAll(limit);
            res.json(rows);
        } catch (err) {
            res.status(500).json({ errorStaffRouteGe: err.message });
        }
    },

    getStaffById: async (req, res) => {
        const { id } = req.params;
        try {
            const [rows] = await staffModel.findById(id);
            if (rows.length === 0) {
                return res.status(404).json({ errorStaffRouteGI1: 'Staff member not found' });
            }
            res.json(rows[0]);
        } catch (err) {
            res.status(500).json({ errorStaffRouteGI2: err.message });
        }
    },

    createStaff: async (req, res) => {
        const {
            name,
            position,
            description,
            education,
            publication,
            email,
            linkedin,
            social_media
        } = req.body;
        const image = req.file;
        let imagePath = null;
        try {
            if (image) {
                imagePath = await uploadImage(image);
            } else {
                imagePath = null;
            }
            const [result] = await staffModel.create( name, position, description, education, publication, email, linkedin, social_media, imagePath );
            const adminId = req.admin.id;
            await createLog(adminId, 'CREATE', 'staff', result.insertId, `${req.admin.username} Created staff member with name: ${name}`);
            res.status(201).json({ id: result.insertId, name, position, description, education, publication, email, linkedin, social_media, image_path : imagePath });
        } catch (err) {
            if (imagePath) {
                const oldFile = path.basename(imagePath);
                await fileHelper.deleteFile(oldFile);
            }
            res.status(500).json({ errorStaffRoutePo: err.message });
        }
    },

    updateStaff: async (req, res) => {
        const { id } = req.params;
        let { name, position, description, education, publication, email, linkedin, social_media, image_path } = req.body;
        const image = req.file;
        try {
            const [rows] = await staffModel.findById(id);
            if (rows.length === 0) {
                if (image) {
                    const tempImage = await uploadImage(image);
                    await fileHelper.deleteFile(path.basename(tempImage));
                }
                return res.status(404).json({ errorStaffRoutePa1: 'Staff member not found' });
            }

            // Use original values if any field is null or undefined
            const original = rows[0];
            name = name ?? original.name;
            position = position ?? original.position;
            description = description ?? original.description;
            education = education ?? original.education;
            publication = publication ?? original.publication;
            email = email ?? original.email;
            linkedin = linkedin ?? original.linkedin;
            social_media = social_media ?? original.social_media;

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

            const [result] = await staffModel.update(
                id, name, position, description, education, publication, email, linkedin, social_media, imagepath
            );
            const adminId = req.admin.id;
            await createLog(adminId, 'UPDATE', 'staff', id, `${req.admin.username} Updated staff member with name: ${name}`);
            res.json({ id, name, position, description, education, publication, email, linkedin, social_media, image_path: imagepath });
        } catch (err) {
            if (image) {
                const tempImage = await uploadImage(image);
                await fileHelper.deleteFile(path.basename(tempImage));
            }
            res.status(500).json({ errorStaffRoutePa2: err.message });
        }
    },
    
    deleteStaff: async (req, res) => {
        const { id } = req.params;
        try {
            const [rows] = await staffModel.findById(id);
            if (rows.length === 0) {
                return res.status(404).json({ errorStaffRouteDe1: 'Staff member not found' });
            }

            const [result] = await staffModel.delete(id);
            const imagePath = rows[0].image_path;
            if (imagePath) {
                const fileName = path.basename(imagePath);
                await fileHelper.deleteFile(fileName);
            }
            
            const adminId = req.admin.id;
            await createLog(adminId, 'DELETE', 'staff', id, `${req.admin.username} Deleted staff member with name: ${rows[0].name}`);
            res.json({ message: 'Staff member deleted successfully' });
        } catch (err) {
            res.status(500).json({ errorStaffRouteDe2: err.message });
        }
    }
};

module.exports = staffController;