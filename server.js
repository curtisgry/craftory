const express = require('express');

if (process.env.NODE_ENV !== 'production') {
        require('dotenv').config();
}

const app = express();
const port = process.env.PORT || 5000;
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const Company = require('./models/Company');
const Item = require('./models/Item');
const User = require('./models/User');
const ExpressError = require('./utils/ExpressError');
const { ensureAuthenticated, isOwner } = require('./middleware');

mongoose.connect('mongodb://localhost:27017/craftoryDev')
        .then(() => {
                console.log('MONGO CONNECTION OPEN');
        })
        .catch((e) => {
                console.log('MONGO CONNECTION ERROR');
                console.log(e);
        });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cors(), function (req, res, next) {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
});

// Express session
const sessionConfig = {
        secret: process.env.SECRET || 'secret',
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
const userRoutes = require('./routes/user');
const companyRoutes = require('./routes/company');
const itemRoutes = require('./routes/item');
const catchAsync = require('./utils/catchAsync');

app.use('/', userRoutes);
app.use('/company', companyRoutes);
app.use('/items', itemRoutes);

// app middleware
app.use((req, res, next) => {
        res.locals.currentUser = req.user;
        next();
});

app.get('/home', (req, res) => {
        res.send({ title: 'Home page!' });
});
app.get('/about', (req, res) => {
        res.send({ title: 'About page!' });
});
app.get('/nav', async (req, res) => {
        if (req.user) {
                const id = req.user._id;
                const companies = await Company.find({ user: id });
                return res.send({ companies });
        }
        res.send([]);
});

app.get('/auth', (req, res) => {
        res.send(req.session);
});

app.get(
        '/dashboard/:id',
        ensureAuthenticated,
        isOwner,
        catchAsync(async (req, res) => {
                const { id } = req.params;

                const company = await Company.findById(id);
                const items = await Item.find().populate('company');
                const filtered = items.filter((item) => item.company.name === company.name);
                res.send({ filtered, company });
        })
);

app.post('/search/:id', async (req, res, next) => {
        const { id } = req.params;
        const { search } = req.body;
        const key = new RegExp(search, 'i');
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

app.listen(port, () => console.log(`Listening on port ${port}`));
