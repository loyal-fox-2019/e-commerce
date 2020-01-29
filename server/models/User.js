const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { hashPassword } = require('../helpers/bcrypt');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name cannot be blank"]
  },
  email: {
    type: String,
    required: [true, "Email cannot be blank"],
    unique: [true, "Email already exists"]
  },
  password: {
    type: String,
    required: [true, "Password cannot be blank"]
  },
  role: {
    type: String,
    default: "customer",
    required: true
  },
  imageUrl: {
    type: String,
    default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfFExj43vNWFXXhr4_S6vYSGqFzjC77uObABaR7mk1biI9Y4eK"
  }
}, {
  timestamps: true
});

userSchema.pre("save", function(next) {
  this.password = hashPassword(this.password);
  next();
})

const User = mongoose.model("User", userSchema);

module.exports = User;
