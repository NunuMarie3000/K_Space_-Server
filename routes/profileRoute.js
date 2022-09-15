// this will eventually be a private route
// get/put users' layouts
const express = require('express')
const router = express.Router()
const profile = require('../models/profileModel')

// create new profile, should be done when user creates account
router.post('/:user', async (req, res) => {
  const userId = req.params.user
  try {
    const defaultProfile = await profile.profileModel.create({
      user: userId,
      profile: "This is your 'Profile' Section! Click edit to add a short bio!",
      mood: "Add a brief mood! Ex: Happy!"
    })
    await defaultProfile.save()
    res.status(201).send('default profile created')
  } catch (error) {
    res.send(error)
  }
})

// get user's profile info
router.get('/:user', async (req, res) => {
  const userId = req.params.user
  try {
    const response = await profile.profileModel.find({ user: userId })
    res.status(200).send(response)
  } catch (error) {
    res.send(error)
  }
})

// update route for when user updates their profile section
router.put('/:user', async (req,res)=>{
  const userId = req.params.user
  const updatedBody = req.body
  try {
    await profile.profileModel.find({ user: userId }).updateOne(updatedBody)
    res.status(200).send('aboutme updated')
  } catch (error) {
    res.send(error)
  }
})

module.exports = router