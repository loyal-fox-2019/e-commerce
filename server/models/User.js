const mongoose = require('mongoose')
const models = mongoose.models
const Schema = mongoose.Schema
const timestamp = require('mongoose-timestamp2')

const {hashPassword} = require('../helpers/bcrypt')

const userSchema = new Schema({
   email: {
      type: String,
      required: [true, 'Please insert email'],
      validate: [
         {
            validator: function(v) {
               return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v)
            },
            message: function(props) {
               return `${props.value} is not a valid email format.`
            }
         },

         {
            validator: async function(v) {
               const tempUser = await models.User.findOne({email: v})
               if(!tempUser) return true
               else return false
            },
            message: function(props) {
               return `${props.value} has been registered in our server.`
            }
         }
      ]
   },

   password: {
      type: String,
      required: [true, 'Please insert password']
   },

   cart: [{
      item: {
         type: Schema.Types.ObjectId,
         ref: 'Item'
      },

      quantity: {
         type: Number,
         default: 0
      }
   }],

   userType: {
      type: String,
      default: 'customer'
   }
})

userSchema.plugin(timestamp)

userSchema.pre('save', function(next) {
   this.password = hashPassword(this.password)
   
   next()
})

const User = mongoose.model('User', userSchema)

module.exports = User