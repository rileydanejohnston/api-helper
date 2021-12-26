// create router
const router = require('express').Router();
const auth = require('../middlewares/auth');
const { getCurrentUser } = require('../controllers/users');

router.get('/currentUser', auth, getCurrentUser);

// export router
module.exports = router;