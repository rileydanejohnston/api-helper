/*
npm install express
npm install nodemon -D
npm init
        i don't think this is necessary?
      brew tap mongodb/brew
      brew install mongodb-community
npm i mongoose
mongod - starts database
npm i bcryptjs - password hashing
npm i jsonwebtoken
add .editorconfig file
npm i eslint --save-dev
npm i eslint-config-airbnb-base --save-dev
npm i eslint-plugin-import --save-dev
add .eslintrc file
npm i winston
npm i express-winston
npm i validator
npm i celebrate
*/
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const {
  register,
  login,
} = require('./controllers/users');
const {
  requestLogger,
  errorLogger,
} = require('./middlewares/logger');

// create port variable
const { PORT = 3000 } = process.env;

// create application variable
const app = express();

// create db with mongoose
mongoose.connect('mongodb://localhost:27017/api-helper');

// middleware function to parse incoming requests as JSON
app.use(express.json());

// log all requests
app.use(requestLogger);

app.use('/register', register);
app.use('/login', login);

// app.use('/users', userRouter);

// log all errors
app.use(errorLogger);

// centralized error handling
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'An error occured on the server'
        : message,
    });
});
// listen for requests on our port variable
app.listen(PORT);
