const express = require('express');
const passport = require('passport');
const { ensureAuthenticated, validateUser } = require('../middleware');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const router = express.Router();

router.post(
        '/register',
        validateUser,
        catchAsync(async (req, res, next) => {
                const { email, username, password } = req.body;

                const checkIfExists = await User.findOne({ email: { $eq: email } });

                if (!checkIfExists) {
                        const user = new User({ email, username });
                        const registeredUser = await User.register(user, password);
                        // take user and log in before redirect

                        req.login(registeredUser, (err) => {
                                if (err) return next(err);
                        });

                        res.redirect('/');
                } else {
                        throw new ExpressError('Email already exists');
                }
        })
);

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  
        res.redirect('/');
});

router.get('/logout', (req, res, next) => {
        req.logout();
        req.session.destroy();
        res.redirect('/');
});

router.get('/user', (req, res) => {
        res.send(req.user);
});

module.exports = router;
