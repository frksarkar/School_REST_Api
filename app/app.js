const morgan = require('morgan');
const express = require('express');

const { adminRouter } = require('../routes/staff/adminRouter');
const { errorHandler, notFound } = require('../middlewares/errorHandler');
const { academicYearRouter } = require('../routes/academic/academicYearRouter');
const {
	academicTermRouter,
} = require('../routes/academic/academicTermRouter ');
const { classLevelRouter } = require('../routes/academic/classLevel');

const app = express();

// add middleware
app.use(morgan('dev'));
app.use(express.json()); // incoming request body

// Router middleware
//admin routes
app.use('/api/v1/admins', adminRouter);
app.use('/api/v1/academic-years', academicYearRouter);
app.use('/api/v1/academic-terms', academicTermRouter);
app.use('/api/v1/class-levels', classLevelRouter);

// not found
app.use(notFound);

// error handlers
app.use(errorHandler);

exports.app = app;
