const express = require('express');
const { register, login, getProfile } = require('../controllers/authController');
const { auth } = require('../middleware/auth');
const { validateUserRegistration, validateUserLogin } = require('../middleware/validation');

const router = express.Router();

router.post('/register', validateUserRegistration, register);
router.post('/login', validateUserLogin, login);
router.get('/profile', auth, getProfile);

module.exports = router;