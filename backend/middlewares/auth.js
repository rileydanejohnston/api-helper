const jwt = require('jsonwebtoken');
const ErrorManager = require('../errors/error-manager');

// purpose is to check user's token to make sure they are authorized to be here
module.exports = (req, res, next) => {
  // destructure the authorization header
  const { authorization } = req.headers;
  // check request has auth - for the token
  if (!authorization || !authorization.startsWith('Bearer '))
  {
    // sychronous code so.. throw new error?
    // use next?
    throw new ErrorManager(403, 'Authorization failed. Request does not have a token and is not authorized.');
  }
  // extract token
  const token = authorization.replace('Bearer ', '');
  let payload;

  // try extracting the payload
  try {
    payload = jwt.verify(token, 'my-secret-key');
  }
  catch (err) {
    next(new ErrorManager(403, 'Authorization failed. Unable to extract token payload.'));
  }

  // write payload to request as new property
  req.user = payload;
  // call next function
  next();
}
