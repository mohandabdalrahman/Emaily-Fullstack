const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  googleId: String,
  credits: {
    type: Number,
    default: 0
  }
})


// create model class
const User = mongoose.model('users', userSchema)
module.exports = User