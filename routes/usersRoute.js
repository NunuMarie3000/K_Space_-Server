// this route needs to get all users
const express = require('express')
const router = express.Router()
const user = require('../models/userModel')

router.get('/', async (req,res)=>{
  try {
    const allUsers = await user.userModel.find({})
    res.status(200).send(allUsers)
  } catch (error) {
    console.log(error.message)
  }
})

// will be public, come back to this
router.get('/:id', async (req,res)=>{
  const userId = req.params.id
  try {
    const publicUser = await user.userModel.findById(userId)
    res.status(200).send(publicUser)
  } catch (error) {
    console.log(error.message)
  }
})

module.exports = router