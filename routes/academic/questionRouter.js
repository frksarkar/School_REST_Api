const express = require('express');

const {
	isAuthenticated,
	roleRestriction,
} = require('../../middlewares/authHandler');
const {
	createQuestion,
	getQuestions,
	getQuestion,
	updateQuestion,
	deleteQuestion,
} = require('../../controller/academic/questionController');

const questionRouter = express.Router();

questionRouter
	.use(isAuthenticated, roleRestriction('teacher'))
	.get('/', getQuestions)
	.post('/:examId', createQuestion)
	.get('/:id', getQuestion)
	.put('/:id', updateQuestion)
	.delete('/:examId/:questionId', deleteQuestion);

exports.questionRouter = questionRouter;
