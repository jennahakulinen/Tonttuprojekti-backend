'use strict';
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

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/recipe', recipeRoute);
app.use('/user', userRoute);
app.use('/unit', unitRoute);
app.use('/category', categoryRoute);
app.use('/step', stepRoute);
app.use('/recing', recipeIngRoute);
app.use('/rates', ratesRoute);
app.use('/ingredients', ingredientsRoute);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));