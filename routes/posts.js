const express = require ('express')
const sequelize = require ('sequelize')
const router = express.Router()
const bodyParser = require('body-parser')

// connecting to databse
const db = require('../modules/database')

// setting router sub app to use bodyparser
router.use(bodyParser.urlencoded({ extended: false }))

// setting up route ro register page
router.get('/add-post', (req, res) => {
  res.render('add-post')
})

// posting new message to database
router.post('/add-post', (req, res) => {
  const newPost = {
    title: req.body.title,
    body: req.body.body,
  }
  console.log(req.body)
  db.Post.create(newPost).then()
  console.log(newPost)
  res.redirect('/')
})

module.exports = router
