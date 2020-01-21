const {model, models, Schema} = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: "Name is required"
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, 'Email must unique'],
        validate: [{
            validator: function (email) {
                const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailRegex.test(email);
            }, message: "Email is not valid"
        },{
            validator: function (email) {
                return models.User.findOne({
                    email: email
                }).then(result => {
                    return !result;
                })
            }, message: "Email has been registered"
        }]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    cart: [
        {
            item: {type: Schema.Types.ObjectId, ref: 'Item'},
            stock: {type: Number, default: 1},
            totalPrice: {type: Number}
        }
    ]
});

userSchema.pre("save", function (next) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(this.password, salt);

    this.password = hash;
    next()
});

const User = model('User', userSchema);

module.exports = User;

