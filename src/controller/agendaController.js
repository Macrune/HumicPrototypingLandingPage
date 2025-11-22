const agendaModel = require('../models/agendaModel.js');
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

const agendaController = {
    getAllAgendas: async (req, res) => {
        const { order = 'DESC', limit } = req.query;
        try {
            const [rows] = await agendaModel.fidAllSorted(order, limit);
            res.json(rows);
        } catch (err) {
            res.status(500).json({ errorAgendaRouteGS: err.message });
        }
    },
    getAgendaById: async (req, res) => {
        const { id } = req.params;
        try {
            const [rows] = await agendaModel.findById(id);
            if (rows.length === 0) {
                return res.status(404).json({ errorAgendaRouteGI: 'Agenda not found' });
            }
            res.json(rows[0]);
        } catch (err) {
            res.status(500).json({ errorAgendaRouteGI: err.message });
        }
    },
    createAgenda: async (req, res) => {
        const { title, content, date } = req.body;
        const image = req.file;
        let imagePath = null;
        console.log(req.headers)
        try {
            if (image){
                imagePath = await uploadImage(image);
            }else {
                imagePath = null;
            }
            const [result] = await agendaModel.create(title, content, date, imagePath);
            const adminId = req.admin.id;
            await createLog(adminId, 'CREATE', 'agenda', result.insertId, `${req.admin.username} Created agenda with title: ${title}`);
            res.status(201).json({ id: result.insertId, title, content, date, image_path : imagePath });
        } catch (err) {
            if (imagePath) {
                const oldFile = path.basename(imagePath);
                await fileHelper.deleteFile(oldFile);
            }
            res.status(500).json({ errorAgendaRoutePo: err.message });
        }
    },
    updateAgenda: async (req, res) => {
        const { id } = req.params;
        let { title, content, date } = req.body;
        const image = req.file;
        try {
            const [rows] = await agendaModel.findById(id);
            if (rows.length === 0) {
                if (image) {
                    const tempImage = await uploadImage(image);
                    await fileHelper.deleteFile(path.basename(tempImage));
                }
                return res.status(404).json({ errorAgendaRoutePa1: 'Agenda not found' });
            }
            const original = rows[0];
            let imagepath = original.image_path;
            if (image) {
                if (imagepath) {
                    const oldFile = path.basename(imagepath);
                    await fileHelper.deleteFile(oldFile);
                    imagepath = await uploadImage(image);
                }else {
                    imagepath = await uploadImage(image);
                }
                
            }
            await agendaModel.update(id, title ?? original.title, content ?? original.content, date ?? original.date, imagepath);
            const adminId = req.admin.id;
            await createLog(adminId, 'UPDATE', 'agenda', id, `${req.admin.username} Updated agenda with title: ${title ?? original.title}`);
            res.json({ id, title: title ?? original.title, content: content ?? original.content, date: date ?? original.date, image_path : imagepath });
        } catch (err) {
            if (image) {
                const tempImage = await uploadImage(image);
                await fileHelper.deleteFile(path.basename(tempImage));
            }
            res.status(500).json({ errorAgendaRoutePa2: err.message });
        }
    },
    deleteAgenda: async (req, res) => {
        const { id } = req.params;
        try {
            const [rows] = await agendaModel.findById(id);
            if (rows.length === 0) {
                return res.status(404).json({ errorAgendaRouteDe1: 'Agenda not found' });
            }
            
            const [result] = await agendaModel.delete(id);
            let imagepath = rows[0].image_path;
            if (imagepath) {
                const oldFile = path.basename(imagepath);
                await fileHelper.deleteFile(oldFile);
            }
            
            const adminId = req.admin.id;
            await createLog(adminId, 'DELETE', 'agenda', id, `${req.admin.username} Deleted agenda with title: ${rows[0].title}`);
            res.json({ message: 'Agenda deleted successfully' });
        } catch (err) {
            res.status(500).json({ errorAgendaRouteDe2: err.message });
        }
    }
};

module.exports = agendaController;