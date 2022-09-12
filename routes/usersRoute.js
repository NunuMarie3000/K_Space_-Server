// this route needs to get all users
const express = require('express')
const router = express.Router()
const userModel = require('../models/userModel')

router.get('/', async (req,res)=>{
  try {
    const allUsers = await userModel.find({})
    res.status(200).send(allUsers)
  } catch (error) {
    console.log(error.message)
  }
})

module.exports = router