const mongoose = require('mongoose')
const { Schema } = mongoose

const entrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  date_of_entry: {
    type: Date,
    required: true
  },
  date_of_update: {
    type: Date
  },
  author: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  }
})

const entryModel = mongoose.model('Entry', entrySchema)

module.exports = { entryModel, entrySchema }