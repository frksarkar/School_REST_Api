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
const { getAllData } = require('../../controller/common');
const { Question } = require('../../module/academic/question');

const questionRouter = express.Router();

questionRouter
	.use(isAuthenticated, roleRestriction('teacher'))
	.get('/', getAllData(Question), getQuestions)
	.post('/:examId', createQuestion)
	.get('/:id', getQuestion)
	.put('/:id', updateQuestion)
	.delete('/:examId/:questionId', deleteQuestion);

exports.questionRouter = questionRouter;
