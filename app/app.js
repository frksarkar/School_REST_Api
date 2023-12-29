const morgan = require('morgan');
const express = require('express');

const app = express();

app.use(morgan('dev'));

exports.app = app;
