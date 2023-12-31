const morgan = require('morgan');
const express = require('express');

const { adminRouter } = require('../routes/staff/adminRouter');
const { errorHandler, notFound } = require('../middlewares/errorHandler');

const app = express();

// add middleware
app.use(morgan('dev'));
app.use(express.json()); // incoming request body

// Router middleware
//admin routes
app.use('/api/v1/admins', adminRouter);

// not found
app.use(notFound);

// error handlers
app.use(errorHandler);

exports.app = app;
