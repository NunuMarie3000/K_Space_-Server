// this is route to get individual user
// will eventually need authorization to view

const express = require('express')
const router = express.Router()
const entry = require('../models/entryModel') 
const user = require('../models/userModel')

// maybe i'll come back later and redo /:user/entry/:id, but we'll see

router.delete('/entry/:id', async (req,res)=>{
  const entryId = req.params.id
  try {
    await entry.entryModel.deleteOne({ _id: { $eq: entryId } })
    res.status(200).send('Entry deleted')
  } catch (error) {
    res.send(error)
  }
})

// update post
// could probs just be '/entry/:id' and post '/entry' but for the sake of my own clarity, it shall remain this way
router.put('/entry/:id', async (req,res)=>{
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
    res.send(error)
  }
})

// i need a default blogpost route
router.post('/newentry/:user', async (req,res)=>{
  const userId = req.params.user
  const defaultPostBody = {
    title: 'New Blog Post!',
    body: "This is a default blog post! We're excited to have you here at k_space! Please enjoy!",
    date_of_entry: Date.now(),
    author: userId
  }
  const defaultPostBody2 = {
    title: 'Give it a try!',
    body: " Try editing this blog post to get into the swing of things!",
    date_of_entry: Date.now(),
    author: userId
  }
  try {
    const defaultPost = await entry.entryModel.create(defaultPostBody)
    const defaultPost2 = await entry.entryModel.create(defaultPostBody2)
    const author = await user.userModel.findById(userId)
    await defaultPost.save()
    await defaultPost2.save()
    author.entries = [defaultPost, defaultPost2]
    await author.save()
    res.status(201).send('default posts created')
  } catch (error) {
    res.send(error)
  }
})

// get all entries by user
router.get('/:user/entries', async (req,res)=>{
  const userId = req.params.user
  try {
    const searchedUser = await user.userModel.findById(userId).populate("entries").exec()
    const entries = searchedUser.entries
    const reverse = entries.reverse()
    res.status(200).send(reverse)
  } catch (error) {
    res.send(error)
  }
})

module.exports = router