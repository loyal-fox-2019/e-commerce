const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const userSchema = new Schema({    
    username: {
        type: String,
        required: true,
        validate: {
            validator: function(u) {
                let result;
                User.findOne({
                    username: u
                }).exec()
                .then((user) => {
                    if(user)
                    {
                        result = false;
                    }
                    else
                    {
                        result = true;
                    }
                })
                .catch(() => {
                    result = false;
                })

                return result;
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    cart: [{
        product: Schema.Types.ObjectId,
        quantity: Number
    }]
}, {timestamps : true},{versionKey : false});   //timestamps add createdAt, updatedAt fields

userSchema.pre('save',function(next) {

    next();
})

const User = mongoose.model("User",userSchema);

module.exports = User;