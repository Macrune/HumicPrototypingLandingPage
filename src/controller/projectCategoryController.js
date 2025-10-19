const projectCategoryModel = require('../models/projectCategoryModel.js');

const projectCategoryConstroller = {
    createProjectCategory: async (req, res) => {
        const { id_project, id_category } = req.body;
        try {
            const [result] = await projectCategoryModel.create(id_project, id_category);
            res.status(201).json({ id: result.insertId, id_project, id_category});
        } catch (err) {
            res.status(500).json({ errorProjectCategoryRoutePo: err.message });
        }
    },
    deleteProjectCategory: async (req, res) => {
        const { id } = req.params;
        try {
            const [result] = await projectCategoryModel.delete(id);
            if (result.length === 0) {
                return res.status(404).json({ errorProjectCategoryRouteDe: 'Project Category not found' });
            }
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