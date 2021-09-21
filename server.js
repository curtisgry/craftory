if (process.env.NODE_ENV !== 'production') {
        require('dotenv').config();
}

const express = require('express');
const helmet = require('helmet');

const port = process.env.PORT || 5000;

const methodOverride = require('method-override');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const flash = require('connect-flash');
const Company = require('./models/Company');
const Item = require('./models/Item');
const User = require('./models/User');

const { ensureAuthenticated, isOwner } = require('./middleware');

// const dbUrl = process.env.DB_URL;
const dbUrl = 'mongodb://localhost:27017/craftoryDev';
const secret = process.env.SECRET || 'developmentmodesecret';

const app = express();
// using cors to try to resolve some axios errors
const corsOptions = {
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200,
        credentials: true,
};
app.use(cors(corsOptions));

app.use(helmet());

// scripts sources for helmet content security policy
const scriptSrcUrls = [
        'https://stackpath.bootstrapcdn.com/',
        'https://kit.fontawesome.com/',
        'https://cdnjs.cloudflare.com/',
        'https://cdn.jsdelivr.net/',
];

// style sheet sources for helmet
const styleSrcUrls = [
        'https://kit-free.fontawesome.com/',
        'https://stackpath.bootstrapcdn.com/',
        'https://fonts.googleapis.com/',
        'https://use.fontawesome.com/',
        'https://cdn.jsdelivr.net/',
];
// font sources if needed
const fontSrcUrls = [];
// set content security policy exceptions
app.use(
        helmet.contentSecurityPolicy({
                directives: {
                        defaultSrc: [],
                        connectSrc: ['https://calm-wave-18798.herokuapp.com/'],
                        manifestSrc: ['https://calm-wave-18798.herokuapp.com/'],
                        scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
                        styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
                        workerSrc: ["'self'", 'blob:'],
                        objectSrc: [],
                        imgSrc: ["'self'", 'blob:', 'data:', 'https://images.unsplash.com/'],
                        fontSrc: ["'self'", ...fontSrcUrls],
                },
        })
);

// connect to database
mongoose.connect(dbUrl)
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

// not sure if will end up using flash but its here

// static files for production
app.use(express.static(path.join(__dirname, 'client/build')));

// potential solution for axios proxy errors, need to change the domain to the heroku URL
// app.use(function (req, res, next) {
//         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/'); // update to match the domain you will make the request from
//         res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization');
//         next();
// });

// create mongo store for session store
const store = new MongoStore({
        mongoUrl: dbUrl,
        secret,
        clear_interval: 3600,
        touchAfter: 24 * 60 * 60,
});

// error handler for session srore
store.on('error', function (e) {
        console.log('SESSION STORE ERROR', e);
});

// Express session
const sessionConfig = {
        store,
        name: 'session',
        secret,
        resave: false,
        saveUninitialized: true,
        cookie: {
                // domain: 'https://calm-wave-18798.herokuapp.com/',
                httpOnly: true,
                expires: Date.now() + 604800000,
                maxAge: 604800000,
        },
};

app.use(session(sessionConfig));
app.use(flash());

// app middleware
app.use((req, res, next) => {
        res.locals.currentUser = req.user;
        next();
});

// passport setup
app.use(passport.initialize());
app.use(passport.session());
// using local strategy for authentication
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Api routes
const userRoutes = require('./routes/user');
const companyRoutes = require('./routes/company');
const itemRoutes = require('./routes/item');

app.use('/', userRoutes);
app.use('/company', companyRoutes);
app.use('/items', itemRoutes);

// check for logged in user and return that users data
app.get('/userdata', ensureAuthenticated, async (req, res) => {
        if (req.user) {
                const id = req.user._id;
                const companies = await Company.find({ user: id });
                return res.send({ companies });
        }
        res.send([]);
});

// did not end up using
// app.get('/auth', (req, res) => {
//         res.send(req.session);
// });

// search in company inventory
app.post('/search/:id', async (req, res, next) => {
        const { id } = req.params;
        const { search } = req.body;
        // make search case insesnsitive and search for partial strings
        const key = new RegExp(search, 'i');
        try {
                // get items returned from search input only in current viewed company ID
                const items = await Item.find({
                        name: key,
                        company: id,
                });
                res.send(items);
        } catch (e) {
                next(e);
        }
});

// serve the correct path for react in production or development
if (process.env.NODE_ENV !== 'production') {
        app.get('*', (req, res) => {
                res.sendFile(path.join(`${__dirname}/client/public/index.html`));
        });
} else {
        app.get('/*', (req, res) => {
                res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
        });
}

// Error handler for routes
app.use((err, req, res, next) => {
        const { statusCode = 500 } = err;
        if (!err.message) err.message = 'Oh no something went wrong!';
        res.status(statusCode);
        res.json({
                message: err.message,
                error: err,
        });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
