const mongoose = require('mongoose')
const { Schema } = mongoose

const aboutMeSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId, 
    ref: 'User',
  },
  about_me: String,
  interests: [String],
  image: String,
})

const aboutMeModel = mongoose.model('AboutMe', aboutMeSchema)

module.exports = { aboutMeSchema, aboutMeModel }