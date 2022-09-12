// route handling all entries by user
// will require authorization

const express = require('express')
const router = express.Router()
const user = require('../models/userModel')
// const mongoose = require('mongoose')
const entry = require('../models/entryModel')

router.get('/:user/entries', async (req,res)=>{
  try {
    const userId = req.params.user
    const searchedUser = await user.userModel.find({"_id": {$eq: userId}}).populate({
      path: 'entries',
      model: entry.entryModel,
    })
    res.send(searchedUser)
  } catch (error) {
    console.log(error.message)
  }
})

module.exports = router