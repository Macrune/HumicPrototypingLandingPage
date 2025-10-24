const internModel = require('../models/internModel.js');
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

const internController = {
    getAllInterns: async (req, res) => {
        try {
            const [rows] = await internModel.findAll();
            res.json(rows);
        } catch (err) {
            res.status(500).json({ errorInternRouteGe: err.message });
        }
    },
    getInternById: async (req, res) => {
        const { id } = req.params;
        try {
            const [rows] = await internModel.findById(id);
            if (rows.length === 0) {
                return res.status(404).json({ errorInternRouteGI: 'Intern not found' });
            }
            res.json(rows[0]);
        } catch (err) {
            res.status(500).json({ errorInternRouteGI: err.message });
        }
    },
    createIntern: async (req, res) => {
        const { name, role, university, major, email, contact, linkedin, social_media } = req.body;
        const image = req.file;
        let imagePath = null;
        try {
            imagePath = await uploadImage(image);
            const [result] = await internModel.create(name, role, university, major, email, contact, linkedin, social_media, imagePath);
            res.status(201).json({ id: result.insertId, name, role, university, major, email, contact, linkedin, social_media, image_path : imagePath });
        } catch (err) {
            if (imagePath) {
                const oldFile = path.basename(imagePath);
                await fileHelper.deleteFile(oldFile);
            }
            res.status(500).json({ errorInternRoutePo: err.message });
        }
    },
    updateIntern: async (req, res) => {
        const { id } = req.params;
        let { name, role, university, major, email, contact, linkedin, social_media } = req.body;
        const image = req.file;
        try {
            const [rows] = await internModel.findById(id);
            if (rows.length === 0) {
                if (image) {
                    const tempImage = await uploadImage(image);
                    await fileHelper.deleteFile(path.basename(tempImage));
                }
                return res.status(404).json({ errorInternRoutePa1: 'Intern not found' });
            }

            const original = rows[0];
            name = name ?? original.name;
            role = role ?? original.role;
            university = university ?? original.university;
            major = major ?? original.major;
            email = email ?? original.email;
            contact = contact ?? original.contact;
            linkedin = linkedin ?? original.linkedin;
            social_media = social_media ?? original.social_media;

            let imagePath = original.image_path;
            if (image) {
                const oldFile = path.basename(original.image_path);
                await fileHelper.deleteFile(oldFile);
                imagePath = await uploadImage(image);
            }
            await internModel.update(id, name, role, university, major, email, contact, linkedin, social_media, imagePath);
            res.json({ id, name, role, university, major, email, contact, linkedin, social_media, image_path : imagePath });
        } catch (err) {
            if (image) {
                const tempImage = await uploadImage(image);
                await fileHelper.deleteFile(path.basename(tempImage));
            }
            res.status(500).json({ errorInternRoutePa2: err.message });
        }
    },
    deleteIntern: async (req, res) => {
        const { id } = req.params;
        try {
            const [rows] = await internModel.findById(id);
            if (rows.length === 0) {
                return res.status(404).json({ errorInternRouteDe1: 'Intern not found' });
            }

            const [result] = await internModel.delete(id);
            const imagePath = rows[0].image_path;
            if (imagePath) {
                const fileName = path.basename(imagePath);
                await fileHelper.deleteFile(fileName);
            }
            
            res.json({ message: 'Intern deleted successfully' });
        } catch (err) {
            res.status(500).json({ errorInternRouteDe2: err.message });
        }
    }
};


module.exports = internController;
