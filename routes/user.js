const express = require('express');
const passport = require('passport');
const ensureAuthenticated = require('../middleware');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

router.post(
        '/register',
        catchAsync(async (req, res, next) => {
                try {
                        const { email, username, password } = req.body;
                        const user = new User({ email, username });
                        const registeredUser = await User.register(user, password);
                        // take user and log in before redirect
                        req.login(registeredUser, (err) => {
                                if (err) return next(err);
                        });
                        res.redirect('/');
                } catch (e) {
                        res.redirect('/');
                }
        })
);

router.post(
        '/login',
        passport.authenticate('local', {
                failureRedirect: '/login',
        }),
        (req, res) => {
                res.redirect('/');
        }
);

router.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
});

router.get('/user', (req, res) => {
        res.send(req.user);
});

module.exports = router;
