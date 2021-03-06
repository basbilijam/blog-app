// requiring modules
const express = require ('express')
const sequelize = require ('sequelize')
const fs = require ('fs')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require ('express-session')


// setting up express app
const app = express()

// Activate the session app wide
app.use(session({
  secret: 'super secure',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))

// connecting to databse
const db = require(__dirname + '/modules/database')

// requiring register route
const register = require(__dirname + '/routes/register')
const addPost = require(__dirname + '/routes/posts')
const logIn = require(__dirname + '/routes/log-in')

// setting view engine and views folder
app.set('view engine', 'pug')
app.set( 'views', __dirname + '/views' )

// setting static folder
app.use('/', express.static( __dirname + '/public') )

// using morgan middleware for debugging
app.use(morgan('dev'));

// setting the app to use routes
app.use('/', register)
app.use('/', addPost)
app.use('/', logIn)


app.use(bodyParser.urlencoded({ extended: false }))

// rendering all posts in database as the homepage
app.get('/', (req, res) => {
  db.Post.findAll( {
    // including both the users that posted the message, as well as the comments and users that posted the comments
    include: [
      { model: db.Comment, include: [db.User] },
      { model: db.User }
    ],
    order: [['createdAt', 'DESC']]
  }).then( (posts) => {
    console.log(posts)
    res.render('index', {
      posts: posts,
      user: req.session.user
    })
  })
})

app.listen(3000, (req, res) => {
  console.log('Server running')
})
