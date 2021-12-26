// import Users model so we can CRUD docs in the DB
const Users = require('../models/user');
//import bcrypt for password hashing
const bcrypt = require('bcryptjs');
// include jsonwebtoken package for tokens
const jwt = require('jsonwebtoken');
const ErrorManager = require('../errors/error-manager');

// register accepts an email and password. Creates a new user
module.exports.register = (req, res, next) => {
  // get email, password from request body
  const { email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => Users.create({ email, password: hash }))
    .then((user) => {
      res.status(201).send({
        data: {
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          _id: user._id,
        },
      });
    })
    .catch((err) => {
      if (err.name === 'MongoServerError'){
        next(new ErrorManager(409, 'Registration failed. The email is already registered.'));
      }
      else if (err.name === 'ValidationError'){
        next(new ErrorManager(400, 'Registration failed. The email or password are invalid.'));
      }
      next(new ErrorManager(500, 'Registration failed. Unable to identify the error'));
  });
}

module.exports.login = (req, res, next) => {
  // get email/password from req
  const { email, password } = req.body;

  // search DB for email
  // we need the password so include it from DB
  Users.findOne({ email }).select('+password')
    .then((user) => {
      // return error if email doesn't exist
      if (!user) {
        return Promise.reject(new ErrorManager(401, 'Login failed. The email was not found.'));
      }

      // compare login password with hash password
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          // if the password doesnt match, return error
          if (!matched){
            return Promise.reject(new ErrorManager(403, 'Login failed. The password was incorrect.'));
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
    // pass thrown errors to central error handler
    .catch((next));

}

module.exports.getCurrentUser = (req, res, next) => {
  // id will be available in the req object thanks to auth middleware
  const { _id } = req.user;
  // search db for matching id
  // either find the user or pass an error
  return Users.findById(_id)
    .then((user) => res.status(200).send({ data: user }))
    .catch(next);
}