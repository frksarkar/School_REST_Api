const express = require('express');

const { isLoginTeacher, isTeacher } = require('../../middlewares/authHandler');
const {
	createExam,
	getExams,
	getExam,
	updateExam,
	deleteExam,
} = require('../../controller/academic/examController');

const examRouter = express.Router();

examRouter
	.use(isLoginTeacher, isTeacher)
	.get('/', getExams)
	.post('/create', createExam)
	.get('/:id', getExam)
	.put('/:id', updateExam)
	.delete('/:id', deleteExam);

exports.examRouter = examRouter;
