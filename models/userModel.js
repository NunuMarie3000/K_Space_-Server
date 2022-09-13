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
      ref: 'Entry',
    }
  ],
  Interests: [String],
  ProfilePic: String,
  // if i add default layout object here, how would i be able to populate it?
  // make separate route for getting/updating layouts
  // layout: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Layout'
  // }
})

const userModel = mongoose.model('User', userSchema)

module.exports = { userSchema, userModel }