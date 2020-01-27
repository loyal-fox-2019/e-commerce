const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { encryptPassword } = require("../helpers/bcrypt");

const userSchema = new Schema({
  full_name: {
    type: String,
    minlength: [3, "Minimum Length is 3"],
    required: [true, "Name cannot be null"]
  },
  email: {
    type: String,
    required: [true, "Email cannot be null"],
    validate: [
      {
        validator: function(value) {
          var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          return emailRegex.test(value);
        },
        msg: "Email Format Invalid"
      },
      {
        validator: value => {
          const Model = mongoose.model("User");
          return Model.findOne({ email: value }).then(user => {
            if (user) return false;
            return true;
          });
        },
        msg: "Email Already Registered"
      }
    ]
  },
  password: {
    type: String,
    minlength: [8, "Minimum Password Length : 8"],
    required: [true, "Password cannot be Null"]
  },
  address: {
    type: String
  },
  role: {
    type: String,
    default: "User"
  }
});

userSchema.pre("save", function(next) {
  this.password = encryptPassword(this.password);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
