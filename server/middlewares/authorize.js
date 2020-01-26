const Inventori = require('../models/inventori.js')
const { ObjectId } = require('mongoose').Types
function authorize(req, res, next) {
	Inventori.findOne({
		_id: ObjectId(req.params.id)
	})
	.then((inventori)=> {
		if (!inventori) {
			next({
				status: 404,
				message: 'Barang yg dituju tidak ada'
			})
		} else {
			if (inventori.userId != req.userInfo.id) {
				next({
				status: 403,
				message: 'Forbidden Access: Unauthorized User'
			})
			} else {
				next()
			}
		}
	})
	.catch((err) => {
		next(err)
	})
}

module.exports = authorize