// set up database connection
const sequelize = require ('sequelize')
const pg = require('pg')
const express = require ('express')

const db = new sequelize( 'blog', 'bas', 'bas', {
  host: 'localhost',
  dialect: 'postgres'
} )

//// Models
// User
const User = db.define( 'user', {
	username: sequelize.STRING,
	email: sequelize.STRING,
  // Password not hashed yet!!!
	password: sequelize.STRING
} )

// Post
const Post = db.define( 'post', {
	title: sequelize.STRING,
	body: sequelize.STRING
} )

// Comment
const Comment = db.define( 'comment', {
	body: sequelize.STRING
} )

// setting db relations
Post.belongsTo( User )
User.hasMany( Post )
Comment.belongsTo( User)
Comment.belongsTo( Post)
User.hasMany ( Comment)
Post.hasMany( Comment)

// syncing database and creating some test users
db
  .sync({ force: false })
  .then( (err) => {
    console.log('It worked!')
    return Promise.all ([
      User.create( {
  			username: "Bas",
  			email: "bas@basb.com",
  			password: "basb"
		  } ),
      User.create ( {
        username: "Klaas",
        email: "klaas@klaas.com",
        password: "klaas"
      })
    ])
  } )
  .then ( users => {
      return Post.create ( {
        title: 'lorem',
        body: 'lorem',
        userId: 1
      })
    })
  .then ( apost => {
      return Post.create ( {
      title: 'lorem2',
      body: 'lorem2',
      userId: 1
  })
  .then ( anotherpost => {
      return Post.create ( {
      title: 'lorem3',
      body: "lorem4",
      userId: 2
  })
  .catch( console.log.bind( console ) )
  })
})

// exporting database as a module
module.exports = {
  conn: db,
  User:User,
  Post:Post,
  Comment:Comment
}
