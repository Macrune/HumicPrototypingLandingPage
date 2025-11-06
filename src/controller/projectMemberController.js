const projectMemberModel = require('../models/projectMemberModel.js');
const projectModel = require('../models/projectModel.js');
const internModel = require('../models/internModel.js');
const { createLog } = require('../models/logsModel.js');

const projectMemberController = {
    createProjectMember: async (req, res) => {
        const { id_project, id_intern } = req.body;
        try {
            const [result] = await projectMemberModel.create(id_project, id_intern);
            const [projects] = await projectModel.findById(id_project);
            const [interns] = await internModel.findById(id_intern);
            const adminId = req.admin.id;
            await createLog(adminId, 'CREATE', 'project_member', result.insertId, `${req.admin.username} Added intern ${interns[0].name} to project ${projects[0].title}`);
            res.status(201).json({ id: result.insertId, id_project, id_intern});
        } catch (err) {
            res.status(500).json({ errorProjectMemberRoutePo: err.message });
        }
    },
    deleteProjectMember: async (req, res) => {
        const { id } = req.params;
        try {
            const [rows] = await projectMemberModel.findById(id);
            const [result] = await projectMemberModel.delete(id);
            if (result.length === 0) {
                return res.status(404).json({ errorProjectMemberRouteDe: 'Project Member not found' });
            }
            const [projects] = await projectModel.findById(rows[0].id_project);
            const [interns] = await internModel.findById(rows[0].id_intern);
            const adminId = req.admin.id;
            await createLog(adminId, 'DELETE', 'project_member', id, `${req.admin.username} Removed intern ${interns[0].name} from project ${projects[0].title}`);
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