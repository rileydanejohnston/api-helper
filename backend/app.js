/* 
npm install express
npm install nodemon -D
npm init
        i don't think this is necessary?
      brew tap mongodb/brew
      brew install mongodb-community
npm i mongoose
mongod - starts database
*/
const express = require('express');
const mongoose = require('mongoose');

// create port variable
const { PORT = 3000 } = process.env;

// create application variable
const app = express();

// create db with mongoose
mongoose.connect('mongodb://localhost:27017/api-helper');

// middleware function to parse incoming requests as JSON
app.use(express.json());

// listen for requests on our port variable
app.listen(PORT);
