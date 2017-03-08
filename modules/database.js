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

Post.belongsTo( User )
User.hasMany( Post )
Comment.belongsTo( User)
Comment.belongsTo( Post)
User.hasMany ( Comment)
Post.hasMany( Comment)

db
  .sync({ force: true })
  .then( (err) => {
    console.log('It worked!')
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
  }, (err) => {
    console.log('An error occurred while creating the table:', err);
  }).then (Users => {
    return Post.create ( {
      title: 'lorem',
      body: 'lorem',
      userId: 1
    }).then (Users => {
      return Post.create ( {
      title: 'lorem2',
      body: 'lorem2',
      userId: 1
    }).then (Users => {
      return Post.create ( {
      title: 'lorem3',
      body: "lorem4",
      userId: 2
    })
    }).catch( console.log.bind( console ) )
  })
})

/*
db.sync( { force: true } ).then( f => {
	// Make a Promise all array that starts making users at the same time ( so not in order )
	return Promise.all( [
		User.create( {
			name: "Bas",
			email: "bas@basb.com",
			password: "basb"
		} )
	] )
} ).then( Users => {
	// users contains an array of the results of the above Promise.all
	console.log( Users )
	// This post promise is returned to the next .then
	return Post.create( {
		title: "demopost",
		body: "demopostcontent"
	} )
} ).then( user => {
	// We here use the resulting user to create a post on their behalf
	return user.createPost( {
		title: "demo",
		body: "demo"
	} ).catch( console.log.bind( console ) )
})
*/

module.exports = {
  conn: db,
  User:User,
  Post:Post,
  Comment:Comment
}
