const express = require("express");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();
const port = process.env.PORT || 5000;

const methodOverride = require("method-override");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
const flash = require("connect-flash");
const Company = require("./models/Company");
const Item = require("./models/Item");
const User = require("./models/User");
const ExpressError = require("./utils/ExpressError");
const { ensureAuthenticated, isOwner } = require("./middleware");

const dbUrl = process.env.DB_URL;
const devUrl = "mongodb://localhost:27017/craftoryDev";
const secret = process.env.SECRET || "thisshouldbeabettersecret";

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("MONGO CONNECTION OPEN");
  })
  .catch((e) => {
    console.log("MONGO CONNECTION ERROR");
    console.log(e);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(flash());
app.use(cors());

app.use(express.static(path.join(__dirname, "client/build")));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const store = new MongoStore({
  mongoUrl: dbUrl,
  secret,
  touchAfter: 24 * 60 * 60,
});

store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});

// Express session
const sessionConfig = {
  store,
  name: "session",
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 604800000,
    maxAge: 604800000,
  },
};

app.use(session(sessionConfig));

// passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Api routes
const userRoutes = require("./routes/user");
const companyRoutes = require("./routes/company");
const itemRoutes = require("./routes/item");
const catchAsync = require("./utils/catchAsync");

app.use("/", userRoutes);
app.use("/company", companyRoutes);
app.use("/items", itemRoutes);

// app middleware
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.get("/home", (req, res) => {
  res.send({ title: "Home page!" });
});
app.get("/about", (req, res) => {
  res.send({ title: "About page!" });
});
app.get("/userdata", ensureAuthenticated, async (req, res) => {
  if (req.user) {
    const id = req.user._id;
    const companies = await Company.find({ user: id });
    return res.send({ companies });
  }
  res.send([]);
});

app.get("/auth", (req, res) => {
  res.send(req.session);
});

app.post("/search/:id", async (req, res, next) => {
  const { id } = req.params;
  const { search } = req.body;
  const key = new RegExp(search, "i");
  try {
    const items = await Item.find({
      name: key,
      company: id,
    });
    res.send(items);
  } catch (e) {
    next(e);
  }
});

if (process.env.NODE_ENV !== "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(`${__dirname}/client/public/index.html`));
  });
} else {
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
