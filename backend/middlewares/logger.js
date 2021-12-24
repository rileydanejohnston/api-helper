const winston = require('winston');
const expressWinston = require('express-winston');

// create request logger
const requestLogger = expressWinston.logger({
  // designating where the request file goes
  transports: [
    new winston.transports.File({ filename: './logs/request.log' })
  ],
  // designate JSON format
  format: winston.format.json(),
});

// create error logger
const errorLogger = expressWinston.errorLogger({
  // designating where the request file goes
  transports: [
    new winston.transports.File({ filename: './logs/error.log' })
  ],
  // designate JSON format
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};