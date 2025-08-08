const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secrettoken';


function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ status: 'error', message: 'Token não fornecido.' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ status: 'error', message: 'Token inválido.' });
    }
}

module.exports = authMiddleware;
