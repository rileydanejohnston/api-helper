// create router
const router = require('express').Router();
const {
  register,
} = require('../controllers/users');

router.post('/register', register);

// export router
module.exports = router;