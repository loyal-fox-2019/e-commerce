const hash = require('../helpers/hashPassword')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minLength: [6, "minimal characters for password is 6"]
    }

})

userSchema.pre("save", function () {
    let hashedPass = hash(this.password)
    this.password = hashedPass
})

const User = mongoose.model("User", userSchema)

module.exports = User