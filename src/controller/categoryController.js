const categoryModel = require('../models/categoryModel');

const categoryController = {
    getAllCategorys: async (req, res) => {
        try {
            const [rows] = await categoryModel.findAll();
            res.json(rows);
        } catch (err) {
            res.status(500).json({ errorCategoryRouteGe: err.message })
        }
    },
    getCategoryById: async (req, res) => {
        const { id } = req.params;
        try {
            const [rows] = await categoryModel.findById(id);
            if (rows.affectedRows === 0) {
                return res.status(404).json({ errorCategoryRouteGI: 'Category not found' });
            }
            res.json(rows[0]);
        } catch (err) {
            res.status(500).json({ errorCategoryRouteGI: err.message })
        }
    },
    createCategory: async (req, res) => {
        const { name } = req.body;
        try {
            const [result] = await categoryModel.create(name);
            res.status(201).json({ id: result.insertId, name});
        } catch (err) {
            res.status(500).json({ errorCategoryRoutePo: err.message })
        }
    },
    updateCategory: async (req, res) => {
        const { id } = req.params;
        let { name } = req.body;
        try {
            const [rows] = await categoryModel.findById(id);
            if (rows.length === 0) {
                return res.status(404).json({ errorCategoryRoutePa1: 'Category not found' });
            }
            const original = rows[0];
            name = name ?? original.name;
            await categoryModel.update(id, name);
            res.json({ id, name });
        } catch (err) {
            res.status(500).json({ errorCategoryRoutePa: err.message })
        }
    },
    deleteCategory: async (req, res) => {
        const { id } = req.params;
        try {
            const [result] = await categoryModel.delete(id);
            if (result.affectedRows === 0) {
                return res.status(404).json({ errorCategoryRouteDe1: 'Category not found' });
            }
            res.json({ message: 'Category deleted successfully' });
        } catch (err) {
            res.status(500).json({ errorCategoryRouteDe: err.message })
        }
    }
};

module.exports = categoryController;