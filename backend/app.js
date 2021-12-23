/* 
npm install express
npm install nodemon -D
npm init
*/

const express = require('express');

// create port variable
const { PORT = 3000 } = process.env;

// create application variable
const app = express();

// middleware so all requests come through as JSON
app.use(express.json());

// listen for requests on our port variable
app.listen(PORT);
