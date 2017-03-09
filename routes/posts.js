const express = require ('express')
const sequelize = require ('sequelize')
const router = express.Router()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// connecting to databse
const db = require('../modules/database')

// setting router sub app to use bodyparser
router.use(bodyParser.urlencoded({ extended: false }))

router.use(methodOverride( (req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}))

// setting up route ro register page
router.get('/add-post', (req, res) => {
  res.render('add-post')
})

//show 1 post the unique id
router.get('/show-1-post/:id', (request, response) => {
  db.Post.findOne({
    where: {
      id: request.params.id
    },
    include: [db.Comment]
  }).then( thepost => {
    response.render('show-1-post', { post: thepost })
  })
})

// posting new message to database
router.post('/add-post', (req, res) => {
  const newPost = {
    title: req.body.title,
    body: req.body.body,
    userId: req.session.user.id
  }
  console.log(req.body)
  db.Post.create(newPost).then()
  console.log(newPost)
  res.redirect('/')
})

// comment on post

router.post('/add-comment', (req, res) => {
  const newComment = {
    body: req.body.body,
    userId: req.session.user.id,
    postId: req.body.currentpostId
  }
  db.Comment.create(newComment).then( newcomment => {
    res.redirect('/')
  })
})

// trying to make a delete funtion
router.get('/delete', (req, res) => {
  console.log(req.params.id);
  db.Post.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.redirect('/');
  });
});

module.exports = router
