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
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(v);
            },
            message: "Invalid email address."
        }
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
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: Number
    }]
}, {timestamps : true},{versionKey : false});   //timestamps add createdAt, updatedAt fields

userSchema.pre('save',function(next) {
    User.findOne({
        username: this.username
    })
    .exec()
    .then((user) => {  
        if(user)// found user with this username
        {
            if(user._id.toString() != this._id.toString())
            {
                next(new Error("Username already taken."))
            }
            else // matching id
            {
                return User.findOne({
                    email: this.email
                }).exec();
            }
        }
        else // username free
        {            
            return User.findOne({
                email: this.email
            }).exec();
        }
    })
    .then((user) => {  
        if(user)
        {
            if(user._id.toString() != this._id.toString())
            {
                next(new Error("Email already registered."))
            }
            else //matching id
            {
                next()
            }
        }
        else //email free so new user
        {
            this.password = hashPassword(this.password);     
            next()
        }
    })
    .catch((err) => {
        console.log(err);                    
    });

    for(let i=0;i<this.cart.length;i++)
    {
        this.cart[i].product = ObjectId(this.cart[i].product)
    }
})

const User = mongoose.model("User",userSchema);

module.exports = User;