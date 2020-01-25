const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hash } = require('../helpers/bcrypt')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: function (v) {
                return User.findOne({ email: v })
                    .then((user) => {
                        if (user) return false
                    })
                    .catch(err => {
                        console.log(err, 'err di mode');
                    })
            },
            message: "Email has been used"
        },
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email invalid']
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must longer than 6 character"],
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
        validate: {
            validator: function (v) {
                User.findOne({ phone: v })
                    .then((user) => {
                        return user ? false : true
                    })
                    .catch(err => {
                        console.log(err, 'err di mode');
                    })
            }
        }
    }
}, {
    timestamps: true,
    versionKey: false
})

userSchema.pre('save', function (next) {
    this.password = hash(this.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User