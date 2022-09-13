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
    console.log(error.message)
  }
})

// get all entries by user
router.get('/:user/entries', async (req,res)=>{
  const userId = req.params.user
  try {
    const searchedUser = await user.userModel.findById(userId).populate("entries").exec()
    res.status(200).send(searchedUser.entries)
  } catch (error) {
    console.log(error.message)
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
    console.log(error.message)
  }
})

router.delete('/:user/entry/:id', async (req,res)=>{
  const entryId = req.params.id
  try {
    await entry.entryModel.deleteOne({ _id: { $eq: entryId } })
    res.status(200).send('Entry deleted')
  } catch (error) {
    console.log(error.message)
  }
})

// update post
// could probs just be '/entry/:id' and post '/entry' but for the sake of my own clarity, it shall remain this way
router.put('/:user/entry/:id', async (req,res)=>{
  // const userId = req.params.user
  const postId = req.params.id
  const updatedPostBody = {
    title: req.body.title,
    body: req.body.body,
    date_of_entry: req.body.date_of_entry,
    date_of_update: Date.now(),
    author: req.params.user
  }
  try {
    await entry.entryModel.findById(postId).updateOne(updatedPostBody)
    res.status(202).send('post updated')
  } catch (error) {
    console.log(error.message)
  }
})

// delete post
// router.delete('/:user/entry/:id', (req,res)=>{

// })

module.exports = router