const express = require('express');

const { isAdmin, isLoggedIn } = require('../../middlewares/authHandler');
const {
	adminToggleExamResult,
} = require('../../controller/academic/examResultController');

const examResultRouter = express.Router();

examResultRouter.use(isLoggedIn, isAdmin).post('/publish/:examId', adminToggleExamResult);

exports.examResultRouter = examResultRouter;
