const express = require('express');
const passport = require('passport');
const { newUser, logOutUser, getCurrentUser, logInUser } = require('../controllers/users');
const { validateUser } = require('../middleware');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

router.post('/register', validateUser, catchAsync(newUser));

router.post('/login', passport.authenticate('local'), logInUser);

router.get('/logout', logOutUser);

router.get('/user', getCurrentUser);

module.exports = router;
