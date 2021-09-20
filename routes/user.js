const express = require("express");
const passport = require("passport");
const ensureAuthenticated = require("../middleware");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");

const router = express.Router();

router.post(
  "/register",
  catchAsync(async (req, res, next) => {
    const { email, username, password } = req.body;
    if (email && username.length > 3 && password.length > 7) {
      const checkIfExists = await User.findOne({ email: { $eq: email } });

      if (!checkIfExists) {
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        // take user and log in before redirect

        req.login(registeredUser, (err) => {
          if (err) return next(err);
        });
        res.redirect("/");
      } else {
        throw new ExpressError("Email already exists");
      }
    } else {
      throw new ExpressError("Missing fields");
    }
  })
);

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  res.redirect("/");
});

router.get("/logout", (req, res, next) => {
  req.logout();
  req.flash("success", "Logged Out");
  res.redirect("/");
});

router.get("/user", (req, res) => {
  res.send(req.user);
});

module.exports = router;
