const express = require('express');

const { roleRestriction, isAuthenticated } = require('../../middlewares/authHandler');
const {
	adminToggleExamResult,
	adminGetAllExamResult,
} = require('../../controller/academic/examResultController');

const examResultRouter = express.Router();

examResultRouter
	.use(isAuthenticated, roleRestriction('admin'))
	.put('/publish/:examId', adminToggleExamResult)
	.get('/', adminGetAllExamResult);

exports.examResultRouter = examResultRouter;
