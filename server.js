require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
app.use(cors())
app.use(bodyParser.json())

// const seed = require('./funcs/seedDB')

const home = require('./routes/home')
const users = require('./routes/usersRoute')
const user = require('./routes/userRoute')
const entry = require('./routes/entryRoute')
const layout = require('./routes/layoutRoute')

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, ()=>{
  console.log('db connected');
})

// seed.seedUser()
// seed.seedUserInfo()
// seed.seedEntry()
app.use(home)
app.use('/users', users)
app.use(user)
app.use(entry)
app.use(layout)

app.listen(process.env.PORT, ()=>{
  console.log(`listening on port ${process.env.PORT}`)
})