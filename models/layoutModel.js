const mongoose = require('mongoose')
const { Schema } = mongoose

// i'll be able to get username and email via auth0 later
const layoutSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  backColor: String,
  backImage: String,
  fontBodyColor: String,
  fontTitleColor: String,
  songSrc: String,
  heroImg1: String,
  heroImg1Alt: String,
  heroImg2: String,
  heroImg2Alt: String,

})

const layoutModel = mongoose.model('Layout', layoutSchema)

module.exports = { layoutSchema, layoutModel }