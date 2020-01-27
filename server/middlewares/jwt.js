'use strict';

const jwt = reuqire('jsonwebtoken');

module.exports = {
    generateToken(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET);
    },

    verifyToken(token) {
        return jwt.verify(token, process.env.JWT_TOKEN);
    }
}