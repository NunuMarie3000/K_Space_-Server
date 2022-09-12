const mongoose = require('mongoose')
const { Schema } = mongoose

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

module.exports = userModel