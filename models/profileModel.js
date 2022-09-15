const mongoose = require('mongoose')
const { Schema } = mongoose

const profileSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId, 
    ref: 'User',
  },
  profile: String,
  mood: String,
  profilePic: String,
  username: String
})

const profileModel = mongoose.model('Profile', profileSchema)

module.exports = { profileSchema, profileModel }