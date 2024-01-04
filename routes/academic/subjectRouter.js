const express = require('express');

const { isLoggedIn, isAdmin } = require('../../middlewares/authHandler');
const {
	createSubject,
	getSubjects,
	getSubject,
	updateSubject,
	deleteSubject,
} = require('../../controller/academic/subjectController');

const subjectRouter = express.Router();

subjectRouter
	.use(isLoggedIn, isAdmin)
	.get('/', getSubjects)
	.post('/:programId', createSubject)
	.get('/:id', getSubject)
	.put('/:id', updateSubject)
	.delete('/:id/:programId', deleteSubject);

exports.subjectRouter = subjectRouter;
