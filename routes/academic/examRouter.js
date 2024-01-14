const express = require('express');

const {
	isAuthenticated,
	roleRestriction,
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

examRouter.put(
	'/publish/:examId',
	isAuthenticated,
	roleRestriction('admin'),
	adminChangeExamStatus
);

examRouter
	.use(isAuthenticated, roleRestriction('teacher'))
	.get('/', getExams)
	.post('/create', createExam)
	.get('/:id', getExam)
	.put('/:id', updateExam)
	.delete('/:id', deleteExam);

exports.examRouter = examRouter;
