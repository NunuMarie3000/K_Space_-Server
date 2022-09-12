const mongoose = require('mongoose')
const { Schema } = mongoose

const userInfoSchema = new mongoose.Schema({
  User: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  Interests: [String],
  ProfilePic: String,
})

const userInfoModel = mongoose.model('UserInfo', userInfoSchema)

module.exports = userInfoModel