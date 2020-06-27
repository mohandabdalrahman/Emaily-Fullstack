const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  googleId: String
})


// create model class
const User = mongoose.model('users', userSchema)
module.exports = User