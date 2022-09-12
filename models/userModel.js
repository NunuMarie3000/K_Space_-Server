const mongoose = require('mongoose')
const { Schema } = mongoose

// i'll be able to get username and email via auth0 later
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  entries: [
    { 
      type: Schema.Types.ObjectId, 
      ref: 'Entry' 
    }
  ],
  userInfo: {
    type: Schema.Types.ObjectId, 
    ref: 'UserInfo'
  }
})

const userModel = mongoose.model('User', userSchema)

module.exports = { userModel, userSchema }