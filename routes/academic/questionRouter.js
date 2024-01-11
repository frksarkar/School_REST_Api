const express = require('express');

const { isLoginTeacher, isTeacher } = require('../../middlewares/authHandler');
const {
	createQuestion,
	getQuestions,
	getQuestion,
	updateQuestion,
	deleteQuestion,
} = require('../../controller/academic/questionController');

const questionRouter = express.Router();

questionRouter
	.use(isLoginTeacher, isTeacher)
	.get('/', getQuestions)
	.post('/:examId', createQuestion)
	.get('/:id', getQuestion)
	.put('/:id', updateQuestion)
	.delete('/:examId/:questionId', deleteQuestion);

exports.questionRouter = questionRouter;
