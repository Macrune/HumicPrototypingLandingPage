const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ errorAuthJWT: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ errorAuthJWT2: 'Token Missing' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ errorAuthJWT3: 'Invalid or Expired Token' });
        }
        req.admin = decoded;
        next();
    });
};

module.exports = authJWT;