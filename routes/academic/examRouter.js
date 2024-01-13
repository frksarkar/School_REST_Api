const express = require('express');

const {
	isLoginTeacher,
	isTeacher,
	isLoggedIn,
	isAdmin,
} = require('../../middlewares/authHandler');
const {
	createExam,
	getExams,
	getExam,
	updateExam,
	deleteExam,
	adminChangeExamStatus,
} = require('../../controller/academic/examController');

const examRouter = express.Router();

examRouter.put('/publish/:examId', isLoggedIn, isAdmin, adminChangeExamStatus);

examRouter
	.use(isLoginTeacher, isTeacher)
	.get('/', getExams)
	.post('/create', createExam)
	.get('/:id', getExam)
	.put('/:id', updateExam)
	.delete('/:id', deleteExam);


exports.examRouter = examRouter;
