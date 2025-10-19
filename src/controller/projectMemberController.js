const projectMemberModel = require('../models/projectMemberModel.js');

const projectMemberController = {
    createProjectMember: async (req, res) => {
        const { id_project, id_intern } = req.body;
        try {
            const [result] = await projectMemberModel.create(id_project, id_intern);
            res.status(201).json({ id: result.insertId, id_project, id_intern});
        } catch (err) {
            res.status(500).json({ errorProjectMemberRoutePo: err.message });
        }
    },
    deleteProjectMember: async (req, res) => {
        const { id } = req.params;
        try {
            const [result] = await projectMemberModel.delete(id);
            if (result.length === 0) {
                return res.status(404).json({ errorProjectMemberRouteDe: 'Project Member not found' });
            }
            res.json({ message : 'Project Member deleted successfully'})
        } catch (err) {
            res.status(500).json({ errorProjectMemberRouteDe: err.message })
        }
    },
    getProjectMemberByProjectId: async (req, res) => {
        const { id_project } = req.params;
        try {
            const [rows] = await projectMemberModel.getMemberByProject(id_project);
            if (rows.length === 0) {
                return res.status(404).json({ errorProjectMemberRouteDe: 'Project Member not found' });
            }
            res.json(rows);
        } catch (err) {
            res.status(500).json({ errorProjectMemberRouteGP: err.message })
        }
    }
};

module.exports = projectMemberController;