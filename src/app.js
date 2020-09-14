'use strict';

const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');

// Initializations
const app = express();

app.use(express.json());

app.use('/users', require('./routes/user'));

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev'));

module.exports = app;
