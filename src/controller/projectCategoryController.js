const projectCategoryModel = require('../models/projectCategoryModel.js');
const projectModel = require('../models/projectModel.js');
const categoryModel = require('../models/categoryModel.js');
const { createLog } = require('../models/logsModel.js');

const projectCategoryConstroller = {
    createProjectCategory: async (req, res) => {
        const { id_project, id_category } = req.body;
        try {
            const [result] = await projectCategoryModel.create(id_project, id_category);
            const [projects] = await projectModel.findById(id_project);
            const [categories] = await categoryModel.findById(id_category);
            const adminId = req.admin.id;
            await createLog(adminId, 'CREATE', 'project_category', result.insertId, `${req.admin.username} Created project category with project title: ${projects[0].title} and category name: ${categories[0].name}`);
            res.status(201).json({ id: result.insertId, id_project, id_category});
        } catch (err) {
            res.status(500).json({ errorProjectCategoryRoutePo: err.message });
        }
    },
    deleteProjectCategory: async (req, res) => {
        const { id } = req.params;
        try {
            const [rows] = await projectCategoryModel.findById(id);
            const [result] = await projectCategoryModel.delete(id);
            if (result.length === 0) {
                return res.status(404).json({ errorProjectCategoryRouteDe: 'Project Category not found' });
            }
            const [projects] = await projectModel.findById(rows[0].id_project);
            const [categories] = await categoryModel.findById(rows[0].id_category);
            const adminId = req.admin.id;
            await createLog(adminId, 'DELETE', 'project_category', id, `${req.admin.username} Deleted category ${categories[0].name} from  project ${projects[0].title}`);
            res.json({ message : 'Project Category deleted successfully'});
        } catch (err) {
            res.status(500).json({ errorProjectCategoryRouteDe: err.message });
        }
    },
    getProjectCategoryByProjectId: async (req, res) => {
        const { id_project } = req.params;
        try {
            const [rows] = await projectCategoryModel.getCategoryByProject(id_project);
            if (rows.length === 0) {
                return res.status(404).json({ errorProjectCategoryRouteGP: 'Project Category not found' });
            }
            res.json(rows);
        } catch (err) {
            res.status(500).json({ errorProjectCategoryRouteGP: err.message });
        }
    }
};

module.exports = projectCategoryConstroller;