const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminModel = require('../models/adminModel.js');
const { createLog } = require('../models/logsModel.js');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

const adminController = {
    login: async (req, res) => {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ errorAdminRouteL: 'Username and password are required' });
        }
        try {
            const [rows] = await adminModel.findByUsername(username);
            if (rows.length === 0) {
                return res.status(401).json({ errorAdminRouteL2: 'Invalid username or password' });
            }

            const admin = rows[0];
            const passwordMatch = await bcrypt.compare(password, admin.password_hash);
            if (!passwordMatch) {
                return res.status(401).json({ errorAdminRouteL3: 'Invalid username or password' });
            }

            adminModel.updateLastLogin(admin.id);

            const token = jwt.sign({ id: admin.id, username: admin.username, role : admin.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
            res.json({ message: 'Login Successful', token, admin: { id: admin.id, username: admin.username } });
        } catch (err) {
            res.status(500).json({ errorAdminRouteL4: err.message });
        }
    },
    getAllAdmins: async (req, res) => {
        try {
            const [rows] = await adminModel.findAll();
            res.json(rows);
        } catch (err) {
            res.status(500).json({ errorAdminRouteGA: err.message });
        }
    },
    getAdminById: async (req, res) => {
        const { id } = req.params;
        try {
            const [rows] = await adminModel.findById(id);
            if (rows.length === 0) {
                return res.status(404).json({ errorAdminRouteGBI: 'Admin not found' });
            }
            res.json(rows[0]);
        } catch (err) {
            res.status(500).json({ errorAdminRouteGBI2: err.message });
        }
    },
    createAdmin: async (req, res) => {
        const { username, password } = req.body;
        const adminRole = req.admin.role;
        console.log('Requested role:', adminRole);
        try {
            if (adminRole && req.admin.role !== 'Master Admin') {
                return res.status(403).json({ errorAdminRouteCA: 'Only Master Admin can create admin' });
            }
            const existingAdmin = await adminModel.findByUsername(username);
            if (existingAdmin[0].length > 0) {
                return res.status(400).json({ errorAdminRouteCA: 'Username already exists' });
            }

            const password_hash = await bcrypt.hash(password, 10);
            const [result] = await adminModel.create(username, password_hash);
            const adminId = req.admin.id;
            await createLog(adminId, 'CREATE', 'admin', result.insertId, `${req.admin.username} Created admin with username: ${username}`);
            res.status(201).json({ id: result.insertId, username });
        } catch (err) {
            res.status(500).json({ errorAdminRouteCA2: err.message });
        }
    },
    updateAdmin: async (req, res) => {
        const { id } = req.params;
        let { username, password } = req.body;
        const adminRole = req.admin.role;
        try {
            if (adminRole && req.admin.role !== 'Master Admin') {
                return res.status(403).json({ errorAdminRouteCA: 'Only Master Admin can update admin' });
            }
            const [rows] = await adminModel.findById(id);
            if (rows.length === 0) {
                return res.status(404).json({ errorAdminRouteUA: 'Admin not found' });
            }

            username = username ?? rows[0].username;
            if (!password) {
                password = rows[0].password_hash;
            } else {
                password = await bcrypt.hash(password, 10);
            }
            await adminModel.update(id, username, password);
            const adminId = req.admin.id;
            await createLog(adminId, 'UPDATE', 'admin', id, `${req.admin.username} Updated admin with username: ${username}`);
            res.json({ id, username });
        } catch (err) {
            res.status(500).json({ errorAdminRouteUA2: err.message });
        }
    },
    deleteAdmin: async (req, res) => {
        const { id } = req.params;
        const adminRole = req.admin.role;
        try {
            if (adminRole && req.admin.role !== 'Master Admin') {
                return res.status(403).json({ errorAdminRouteCA: 'Only Master Admin can delete admin' });
            }
            const [rows] = await adminModel.findById(id);
            if (rows.length === 0) {
                return res.status(404).json({ errorAdminRouteDA: 'Admin not found' });
            }
            await adminModel.delete(id);
            const adminId = req.admin.id;
            await createLog(adminId, 'DELETE', 'admin', id, `${req.admin.username} Deleted admin with username: ${rows[0].username}`);
            res.json({ message: 'Admin deleted successfully' });
        } catch (err) {
            res.status(500).json({ errorAdminRouteDA2: err.message });
        }
    },
    resetPassword: async (req, res) => {
        const { id } = req.params;
        const { new_password } = req.body;
        const adminRole = req.admin.role;
        try {
            if (adminRole && req.admin.role !== 'Master Admin') {
                return res.status(403).json({ errorAdminRouteCA: 'Only Master Admin can reset password' });
            }
            const [rows] = await adminModel.findById(id);
            if (rows.length === 0) {
                return res.status(404).json({ errorAdminRouteRP: 'Admin not found' });
            }
            const password_hash = await bcrypt.hash(new_password, 10);
            await adminModel.updatePassword(id, password_hash);
            const adminId = req.admin.id;
            await createLog(adminId, 'UPDATE', 'admin', id, `${req.admin.username} Reset Password for admin with username: ${rows[0].username}`);
            res.json({ message: 'Password reset successfully' });
        } catch (err) {
            res.status(500).json({ errorAdminRouteRP2: err.message });
        }
    }
};

module.exports = adminController;
