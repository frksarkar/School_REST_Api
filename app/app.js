const morgan = require('morgan');
const express = require('express');

const { adminRouter } = require('../routes/staff/adminRouter');
const { teacherRouter } = require('../routes/staff/teacherRouter');
const { programRouter } = require('../routes/academic/programRouter');
const { subjectRouter } = require('../routes/academic/subjectRouter');
const { errorHandler, notFound } = require('../middlewares/errorHandler');
const { yearGroupRouter } = require('../routes/academic/yearGroupRouter');
const { classLevelRouter } = require('../routes/academic/classLevelRouter');
const { academicYearRouter } = require('../routes/academic/academicYearRouter');
const { academicTermRouter } = require('../routes/academic/academicTermRouter ');

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
app.use('/api/v1/programs', programRouter);
app.use('/api/v1/subjects', subjectRouter);
app.use('/api/v1/year-groups', yearGroupRouter);
app.use('/api/v1/teachers', teacherRouter);

// not found
app.use(notFound);

// error handlers
app.use(errorHandler);

exports.app = app;
