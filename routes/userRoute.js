// this is route to get individual user
// will eventually need authorization to view

const express = require('express')
const router = express.Router()
const user = require('../models/userModel')
const entry = require('../models/entryModel') 

// get 1 user
router.get('/:user', async (req,res)=>{
  const userId = req.params.user
  try {
    const searchedUser = await user.userModel.findOne({"_id": {$eq: userId}}).populate("entries")
    res.status(200).send(searchedUser)
  } catch (error) {
    res.send(error)
  }
})

// get all entries by user
router.get('/:user/entries', async (req,res)=>{
  const userId = req.params.user
  try {
    const searchedUser = await user.userModel.findById(userId).populate("entries").exec()
    res.status(200).send(searchedUser.entries)
  } catch (error) {
    res.send(error)
  }
})

// user create new entry
// when a user creates a new entry, i need to update the userModel with the updated entry...
router.post('/:user/entry', async (req,res)=>{
  const userId = req.params.user
  const newPostBody = {
    title: req.body.title,
    body: req.body.body,
    date_of_entry: Date.now(),
    author: req.params.user
  }
  try {
    const newPost = await entry.entryModel.create(newPostBody)
    const author = await user.userModel.findById(userId)
    await newPost.save()
    author.entries = [...author.entries, newPost]
    await author.save()
    res.status(201).send('post created')
  } catch (error) {
    res.send(error)
  }
})


module.exports = router