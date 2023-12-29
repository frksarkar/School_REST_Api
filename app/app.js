const morgan = require('morgan');
const express = require('express');

const { adminRouter } = require('../routes/staff/adminRouter');

const app = express();

 app.use(morgan('dev'));

// Router middleware
//admin routes
app.use('/api/v1/admins', adminRouter);

exports.app = app;
