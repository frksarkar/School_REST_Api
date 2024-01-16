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
const { getAllData } = require('../../controller/common');
const { Exam } = require('../../module/academic/exam');

const examRouter = express.Router();

examRouter.put(
	'/publish/:examId',
	isAuthenticated,
	roleRestriction('admin'),
	adminChangeExamStatus
);

examRouter
	.use(isAuthenticated, roleRestriction('teacher'))
	.get('/', getAllData(Exam), getExams)
	.post('/create', createExam)
	.get('/:id', getExam)
	.put('/:id', updateExam)
	.delete('/:id', deleteExam);

exports.examRouter = examRouter;
