const passport = require('passport');
const User = require('../models/User');
const ExpressError = require('../utils/ExpressError');

module.exports.newUser = async (req, res, next) => {
        const { email, username, password } = req.body;

        const emailExists = await User.findOne({ email: { $eq: email } });
        const userExists = await User.findOne({ username: { $eq: username } });

        if (!emailExists && !userExists) {
                const user = new User({ email, username });
                const registeredUser = await User.register(user, password);
                // take user and log in before redirect

                req.login(registeredUser, (err) => {
                        if (err) return next(err);
                });

                res.redirect('/');
        } else if (emailExists) {
                throw new ExpressError('Email already exists');
        } else if (userExists) {
                throw new ExpressError('Username already exists');
        } else {
                throw new ExpressError('Username and email already exist');
        }
};

module.exports.logInUser = (req, res, next) => {
        res.redirect('/');
};

module.exports.logOutUser = (req, res, next) => {
        req.logout();
        req.session.destroy();
        res.redirect('/');
};

module.exports.getCurrentUser = (req, res) => {
        res.send(req.user);
};
