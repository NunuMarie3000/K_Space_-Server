// this is route to get individual user
// will eventually need authorization to view

const express = require('express')
const router = express.Router()
const entry = require('../models/entryModel') 

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

module.exports = router