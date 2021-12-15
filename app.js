'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const recipeRoute = require('./routes/recipeRoute');
const userRoute = require('./routes/userRoute');
const unitRoute = require('./routes/unitRoute');
const categoryRoute = require('./routes/categoryRoute');
const stepRoute = require('./routes/stepRoute');
const recipeIngRoute = require('./routes/resipeIngRoute');
const ratesRoute = require('./routes/ratesRoute');
const ingredientsRoute = require('./routes/ingredientsRoute');
const authRoute = require('./routes/authRoute');
const passport = require('./utils/pass');
const { httpError } = require('./utils/errors');

const app = express();

app.use(cors());

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'production') {
  require('./utils/production')(app, process.env.PORT, process.env.HTTPS_PORT);
} else {
  require('./utils/localhost')(app, process.env.PORT);
}

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static('./uploads/'));
app.use('/thumbnails', express.static('thumbnails'));

app.use(passport.initialize());

app.use('/auth', authRoute);
app.use('/user', passport.authenticate('jwt', { session: false }), userRoute);

app.use('/recipe', recipeRoute);
app.use('/unit', unitRoute);
app.use('/category', categoryRoute);
app.use('/step', stepRoute);
app.use('/recing', recipeIngRoute);
app.use('/rates', ratesRoute);
app.use('/ingredients', ingredientsRoute);

app.use((req, res, next) => {
    const err = httpError('Not found', 404);
    next(err);
});

app.use((err, req, res, next) => {
    res
        .status(err.status || 500)
        .json(
            {
                error: {
                    message: err.message || 'internal server error',
                }
            }
        );
});
