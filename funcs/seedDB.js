const userModel = require('../models/userModel')
const userInfoModel = require('../models/userInfoModel')
const entryModel = require('../models/entryModel')

const seedUser = async () => {
  const newUser = await userModel.create({
    username: 'nunumarie3000',
    email: 'vmarie1997@gmail.com',
    entries: ['631f61c98c0f606517813898'],
    userInfo: '631f654a654031e37267aeda'
})
  await newUser.save()
}

const seedUserInfo = async () => {
  const newUserInfo = await userInfoModel.create({
    User: '631f6214762d5ed35adbf9cf',
    Interests: ['riding the bike', 'baking', 'crocheting']
  })
  await newUserInfo.save()
}

const seedEntry = async () => {
  const newEntry = await entryModel.create({
    title: 'New project',
    body: "I'm working on my solo project! Super excited for K_Space!",
    date_of_entry: new Date(),
    author: '631f6214762d5ed35adbf9cf'
  })
  await newEntry.save()
}

module.exports = { seedUser, seedUserInfo, seedEntry }