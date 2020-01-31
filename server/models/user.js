const mongoose = require('mongoose'),
      { hashPass } = require('../helpers/bcrypt')

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required']
    },
    email: {
      type: String,
      required: [true, 'E-mail is required'],
      validate: [{
        validator: function (value) {
          const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
          return value.match(emailFormat)
        },
        message: props => `${props.value} is not a valid email format!`
      }, {
        validator: function (value) {
          return User.findOne({
            id: {$ne: this._id},
            email: value
          })
            .then(data => {
              return !data
            })
            .catch(err => {
              console.log(err)
            })
        },
        message: props => `This email ${props.value} has already been used!`
      }]
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Please insert minimum 8 character for password']
    },
    image: {
      type: String
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    // phone: {
    //   type: String,
    //   validate: [{
    //     validator: function (value) {
    //       const phoneFormat = /(\+62 ((\d{3}([ -]\d{3,})([- ]\d{4,})?)|(\d+)))|(\(\d+\) \d+)|\d{3}( \d+)+|(\d+[ -]\d+)|\d+/
    //       return value.match(phoneFormat)
    //     },
    //     message: props => `${props.value} is not a valid phone number!`
    //   }]
    // },
    cart: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, "Quantity can not be lower than 1"]
      }
    }]
  },
  {
    timestamps: true,
    versionKey: false
  }
)

UserSchema.post('validate', function(doc) {
  this.password = hashPass(this.password);
  this.email = this.email.toLowerCase()
  if (!this.image) {
    this.image = `https://ui-avatars.com/api/?name=${this.name}&size=512`
  }
  console.log(doc._id)
})

const User = mongoose.model('User', UserSchema)
module.exports = User;