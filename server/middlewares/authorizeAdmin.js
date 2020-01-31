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
        next({
            status: 401,
            message: "you not authorize"
        })
    }
}

module.exports = authorizeAdmin