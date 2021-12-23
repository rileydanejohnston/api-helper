// import Users model so we can CRUD docs in the DB
const Users = require('../models/user');
//import bcrypt for password hashing
const bcrypt = require('bcryptjs');

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
