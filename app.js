// requiring modules
const express = require ('express')
const sequelize = require ('sequelize')
const fs = require ('fs')
const bodyParser = require('body-parser')

// setting up express app
const app = express()

// connecting to databse
const db = require(__dirname + '/modules/database')

// requiring register route
const register = require(__dirname + '/routes/register')
const addPost = require(__dirname + '/routes/posts')
const logIn = require(__dirname + '/routes/log-in')

// setting view engine and views folder
app.set('view engine', 'pug')
app.set( 'views', __dirname + '/views' )

// setting the app to use routes
app.use('/', register)
app.use('/', addPost)
app.use('/', logIn)

app.use(bodyParser.urlencoded({ extended: false }))

// rendering all posts in database
app.get('/', (req, res) => {
  db.Post.findAll().then( (posts) => {
    console.log(posts)
    res.render('index', {
      posts: posts
    })
  })
})

app.listen(3000, (req, res) => {
  console.log('Server running')
})
