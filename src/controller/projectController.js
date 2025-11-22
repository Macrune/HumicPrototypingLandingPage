const projectModel = require('../models/projectModel.js');
const projectCategoryModel = require('../models/projectCategoryModel.js');
const projectMemberModel = require('../models/projectMemberModel.js');
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

const projectController = {
    getAllProject: async (req, res) => {
        console.log("GET ALL PROJECT");
        try {
            const [rows] = await projectModel.findAll();
            res.json(rows);
        } catch (err) {
            res.status(500).json({ errorProjectRouteGe: err.message });
        }
    },
    getProjectById: async (req, res) => {
        const { id } = req.params;
        try {
            const [rows] = await projectModel.findById(id);
            if (rows.length === 0) {
                return res.status(404).json({ errorProjectRouteGI: 'Project not found' });
            }

            const [member] = await projectMemberModel.getMemberByProject(id);
            const [category] = await projectCategoryModel.getCategoryByProject(id);

            rows[0].member = member;
            rows[0].category = category;
            res.json(rows[0]);

        } catch (err) {
            res.status(500).json({ errorProjectRouteGI: err.message });
        }
    },
    getProjectBySearch: async (req, res) => {
        const { que } = req.query;
        try {
            const [rows] = await projectModel.findBySearch(que);
            if (rows.length === 0) {
                return res.status(404).json({ errorProjectRouteGS: 'No projects found matching the search criteria' });
            }
            res.json(rows);
        } catch (err) {
            res.status(500).json({ errorProjectRouteGS: err.message });
        }
    },
    getProjectBySearchInternship: async (req, res) => {
        const { que } = req.query;
        try {
            const [rows] = await projectModel.findBySearchInternship(que);
            if (rows.length === 0) {
                return res.status(404).json({ errorProjectRouteGSI: 'No internship projects found matching the search criteria' });
            }
            res.json(rows);
        } catch (err) {
            res.status(500).json({ errorProjectRouteGSI: err.message });
        }
    },
    getProjectBySearchResearchship: async (req, res) => {
        const { que } = req.query;
        try {
            const [rows] = await projectModel.findBySearchResearchship(que);
            if (rows.length === 0) {
                return res.status(404).json({ errorProjectRouteGSI: 'No internship projects found matching the search criteria' });
            }
            res.json(rows);
        } catch (err) {
            res.status(500).json({ errorProjectRouteGSI: err.message });
        }
    },
    createProject: async (req, res) => {
        const { title, description, publication, link } = req.body;
        const image = req.file;
        let imagePath = null;

        try {
            if (image) {
                imagePath = await uploadImage(image);
            } else {
                imagePath = null;
            }
            const [result] = await projectModel.create(title, description, publication, link, imagePath);
            const adminId = req.admin.id;
            await createLog(adminId, 'CREATE', 'project', result.insertId, `${req.admin.username} Created project with title: ${title}`);
            res.status(201).json({ id: result.insertId, title, description, publication, link, image_path : imagePath});
        } catch (err) {
            if (imagePath) {
                const oldFile = path.basename(imagePath);
                await fileHelper.deleteFile(oldFile);
            }
            res.status(500).json({ errorProjectRoutePo: err.message });
        }
    },
    updateProject: async (req, res) => {
        const { id } = req.params;
        let { title, description, publication, link } = req.body;
        const image = req.file;
        try {
            const [rows] = await projectModel.findById(id);
            if (rows.length === 0) {
                if (image) {
                    const tempImage = await uploadImage(image);
                    await fileHelper.deleteFile(path.basename(tempImage));
                }
                return res.status(404).json({ errorProjectRoutePa1: 'Project not found' });
            }

            const original = rows[0];
            title = title ?? original.title;
            description = description ?? original.description;
            publication = publication ?? original.publication;
            link = link ?? original.link;

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

            await projectModel.update(id, title, description, publication, link, imagepath);
            const adminId = req.admin.id;
            await createLog(adminId, 'UPDATE', 'project', id, `${req.admin.username} Updated project with title: ${title}`);
            res.json({ id, title, description, publication, link, image_path : imagepath });
        } catch (err) {
            if (image) {
                const tempImage = await uploadImage(image);
                await fileHelper.deleteFile(path.basename(tempImage));
            }
            res.status(500).json({ errorProjectRoutePa2: err.message });
        }
    },
    deleteProject: async (req, res) => {
        const { id  } = req.params;
        try {
            const [rows] = await projectModel.findById(id);
            if (rows.length === 0) {
                return res.status(404).json({ errorProjectRouteDe1: 'Project not found' });
            }
            const [result] = await projectModel.delete(id);
            let imagepath = rows[0].image_path;
            if (imagepath) {
                const oldFile = path.basename(imagepath);
                await fileHelper.deleteFile(oldFile);
            }

            const adminId = req.admin.id;
            await createLog(adminId, 'DELETE', 'project', id, `${req.admin.username} Deleted project with title: ${rows[0].title}`);
            res.json({ message: 'Project deleted successfully' });
        } catch (err) {
            res.status(500).json({ errorProjectRouteDe: err.message });
        }
    }
};

module.exports = projectController;