// this will eventually be a private route
// get/put users' layouts
const express = require('express')
const router = express.Router()
const user = require('../models/userModel')
const layout = require('../models/layoutModel')

// create new layout, should be done when user creates account
router.post('/layout/:user', async (req,res)=>{
  const userId = req.params.user
  const backColor = '#fff'
  const backImage = 'none'
  try {
    const newLayout = await layout.layoutModel.create({
      user: userId,
      backColor,
      backImage
    })
    await newLayout.save()
    res.status(201).send('layout created')
  } catch (error) {
    console.log(error.message)
  }
})


router.get('/layout/:user', async (req,res)=>{
  const userId = req.params.user
  try {
    const response = await layout.layoutModel.find({user: userId})
    res.status(200).send(response) 
  } catch (error) {
    console.log(error.message)
  }
})

module.exports = router