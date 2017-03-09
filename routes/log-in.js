const express = require ('express')
const sequelize = require ('sequelize')
const router = express.Router()
const bodyParser = require('body-parser')

// connecting to databse
const db = require('../modules/database')

// setting router sub app to use bodyparser
router.use(bodyParser.urlencoded({ extended: false }))

// setting up route to log-in page
router.get('/log-in', (req, res) => {
  if (req.session.user) {
    res.render('profile', {
      user: req.session.user
    })
  } else {
    res.render('log-in')
  }
})

// setting up route to profile page, added functionality to also see new posts that belong to user
router.get('/profile', (req, res) => {
  if (req.session.user) {
    db.User.findOne( {
      where: {
        id: req.session.user.id
      },
      include: [ db.Post]
    }).then( theuser => {
      console.log('user is' +theuser)
      res.render('profile', {
        user: theuser
      })
    })
  } else {
    res.redirect('/log-in')
  }
})

// log in function + setting session
router.post('/log-in', (req, res) => {
  db.User.findOne( {
    where: {
      username: req.body.username
    },
    include: [ db.Post ]
  }).then(user => {
    console.log('Use user object from db is', user)
    if (user.password === req.body.password) {
      req.session.visited = true
      req.session.user = user
      res.render('profile', {
        user: user
      })
    } else {
      res.render('/log-in')
    }
  }).catch(err => {
    res.render('wrong-password')
  })
})

// log out functionality --> destroy session
router.get('/logout', (req,res) => {
  req.session.destroy( (err) => {
    console.log('Log Out'+req.session)
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  })
})

module.exports = router
