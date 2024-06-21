const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

// Middleware för att kontrollera om användaren är admin
function isAdmin(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).send({ message: 'No token provided.' });
    }

    const token = authHeader.split(' ')[1]; // Extrahera token-delen från Bearer token
    if (!token) {
        return res.status(403).send({ message: 'No token provided.' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).send({ message: 'Failed to authenticate token.' });
        }
        if (!decoded || decoded.role !== 'admin') {
            return res.status(403).send({ message: 'Requires admin role.' });
        }
        req.userId = decoded.userId;
        next();
    });
}

module.exports = isAdmin;