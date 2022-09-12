// this is route to get individual user
// will eventually need authorization to view

const express = require('express')
const router = express.Router()
const userModel = require('../models/userModel')

router.get('/:user', async (req,res)=>{
  const userId = req.params.user
  try {
    const user = await userModel.findOne({"_id": {$eq: userId}})
    res.status(200).send(user)
  } catch (error) {
    console.log(error.message)
  }
})

module.exports = router