// this will eventually be a private route
// get/put users' layouts
const express = require('express')
const router = express.Router()
const aboutMe = require('../models/aboutMeModel')

// create new about me, should be done when user creates account
router.post('/:user', async (req, res) => {
  const userId = req.params.user
  try {
    const defaultAboutMe = await aboutMe.aboutMeModel.create({
      user: userId,
      about_me: "This is the 'About Me' Section! Click edit to add any information about yourself you want others to know!",
      image: "https://images.unsplash.com/photo-1663076121570-eb6e69bdde3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
      alt: "Photo by Renato Ramos Puma on Unsplash"
    })
    await defaultAboutMe.save()
    res.status(201).send('default about me created')
  } catch (error) {
    res.send(error)
  }
})

// get user's aboutme info
router.get('/:user', async (req, res) => {
  const userId = req.params.user
  try {
    const response = await aboutMe.aboutMeModel.find({ user: userId })
    res.status(200).send(response)
  } catch (error) {
    res.send(error)
  }
})

// update route for when user updates their aboutme section
router.put('/:user', async (req,res)=>{
  const userId = req.params.user
  const updatedBody = req.body
  try {
    await aboutMe.aboutMeModel.find({ user: userId }).updateOne(updatedBody)
    res.status(200).send('aboutme updated')
  } catch (error) {
    res.send(error)
  }
})

module.exports = router