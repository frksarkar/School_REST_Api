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
const { examRouter } = require('../routes/academic/examRouter');
const { defaultHandler } = require('../middlewares/defaultHandler');
const { studentRouter } = require('../routes/staff/studentRouter');
const { questionRouter } = require('../routes/academic/questionRouter');
const { examResultRouter } = require('../routes/academic/examResultRouter');

const app = express();

// add middleware
app.use(morgan('dev'));
app.use(express.json()); // incoming request body
app.use(defaultHandler) // set default value

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
app.use('/api/v1/exams', examRouter);
app.use('/api/v1/students', studentRouter);
app.use('/api/v1/questions', questionRouter);
app.use('/api/v1/exam/results', examResultRouter);

// not found
app.use(notFound);

// error handlers
app.use(errorHandler);

exports.app = app;
