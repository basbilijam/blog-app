const express = require ('express')
const sequelize = require ('sequelize')
const router = express.Router()
const bodyParser = require('body-parser')

// connecting to databse
const db = require('../modules/database')

// setting router sub app to use bodyparser
router.use(bodyParser.urlencoded({ extended: false }))

// setting up route ro register page
router.get('/log-in', (req, res) => {
  res.render('log-in')
})

router.post('/log-in', (req, res) => {
  db.User.findOne({ username: req.body.username }).then(user => {
      console.log('req is: '+req.body.username)
      console.log('User from db is ', user)
      if (!user) {
        res.render('log-in', { error: 'Wrong email or password.' })
      } else {
        if (req.body.password === user.password) {
          res.render('profile', {
            user: user
          })
        } else {
          res.render('log-in', { error: 'Wrong email or password.' })
        }
      }
    });
});


module.exports = router
