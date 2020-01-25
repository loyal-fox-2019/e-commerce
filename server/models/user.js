const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const hashPassword = require("../helpers/bcrypt.js").hashPassword;
const userSchema = new Schema({    
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    login_type: {
        type: String,
        required: true
    },
    cart: [{
        product: Schema.Types.ObjectId,
        quantity: Number
    }]
}, {timestamps : true},{versionKey : false});   //timestamps add createdAt, updatedAt fields

userSchema.pre('save',function(next) {
    this.password = hashPassword(this.password);
    User.findOne({
        username: this.username
    })
    .exec()
    .then((user) => {  
        if(user)
        {
            if(user._id.toString() != this._id.toString())
            {
                next(new Error("Username already taken."))
            }
            else
            {
                next();
            }
        }
        else
        {            
            next();
        }
    })
    .catch((err) => {
        console.log(err);                    
    })
})

const User = mongoose.model("User",userSchema);

module.exports = User;