const jwt = require('jsonwebtoken');
require('dotenv').config();

const fetchuser = (req, res, next) => {
    const authToken = req.header('auth-token');
    if (!authToken) {
        res.status(401).json({ error: 'Please authenticate using a valid token' });
    }
    try {
        const data = jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET);
        req.userId = data.userId;
        next();
    } catch (error) {
        console.error(error.message);
        res.status(401).json({ error: 'Please authenticate using a valid token' });
    }
}

module.exports = fetchuser;