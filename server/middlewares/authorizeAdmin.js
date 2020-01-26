"use strict"

function authorizeAdmin(req, res, next) {
    try {
        if (req.user.role === 'admin') {
            next()
        } else {
            throw ({
                status: 401,
                message: "you not authorize"
            })
        }
    } catch (err) {
        next(err)
    }
}

module.exports = authorizeAdmin