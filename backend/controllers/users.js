// import Users model so we can CRUD docs in the DB
const Users = require('../models/user');
//import bcrypt for password hashing
const bcrypt = require('bcryptjs');
// include jsonwebtoken package for tokens
const jwt = require('jsonwebtoken');

// register accepts an email and password. Creates a new user
module.exports.register = (req, res) => {
  // get email, password from request body
  const { email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => Users.create({ email, password: hash }))
    .then((user) => {
      res.status(201).send({ 
        data: {
          email: user.email,
          name: user.name,
          _id: user._id,
        },
      });
    })
    .catch((err) => res.status(400).send({ message: err.message }));
}

module.exports.login = (req, res) => {
  // get email/password from req
  const { email, password } = req.body;

  // search DB for email
  Users.findOne({ email })
    .then((user) => {
      // return error if email doesn't exist
      if (!user) {
        return Promise.reject(new Error('Login failed. The email was not found.'));
      }

      // compare login password with hash password
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          // if the password doesnt match, return error
          if (!matched){
            return Promise.reject(new Error('Login failed. The password was incorrect.'));
          }
          // password does match so we return user
          return user;
        })
    })
    // create token
    .then((user) => {
      // assign user id to token, use special key too
      const token = jwt.sign({ _id: user._id }, 'my-secret-key');
      // return token
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message })
    });
    
}