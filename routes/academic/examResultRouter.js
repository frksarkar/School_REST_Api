const express = require('express');

const {
	roleRestriction,
	isAuthenticated,
} = require('../../middlewares/authHandler');
const {
	adminToggleExamResult,
	adminGetAllExamResult,
} = require('../../controller/academic/examResultController');
const { getAllData } = require('../../controller/common');
const { ExamResult } = require('../../module/academic/examResults');

const examResultRouter = express.Router();

examResultRouter
	.use(isAuthenticated, roleRestriction('admin'))
	.put('/publish/:examId', adminToggleExamResult)
	.get('/', getAllData(ExamResult), adminGetAllExamResult);

exports.examResultRouter = examResultRouter;
