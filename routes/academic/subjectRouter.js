const express = require('express');

const {
	isAuthenticated,
	roleRestriction,
} = require('../../middlewares/authHandler');
const {
	createSubject,
	getSubjects,
	getSubject,
	updateSubject,
	deleteSubject,
} = require('../../controller/academic/subjectController');
const { getAllData } = require('../../controller/common');
const { Subject } = require('../../module/academic/subject');

const subjectRouter = express.Router();

subjectRouter
	.use(isAuthenticated, roleRestriction('admin'))
	.get('/', getAllData(Subject), getSubjects)
	.post('/:programId', createSubject)
	.get('/:id', getSubject)
	.put('/:id', updateSubject)
	.delete('/:id/:programId', deleteSubject);

exports.subjectRouter = subjectRouter;
