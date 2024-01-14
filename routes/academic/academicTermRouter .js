const express = require('express');

const {
	isAuthenticated,
	roleRestriction,
} = require('../../middlewares/authHandler');
const {
	createAcademicTerm,
	getAcademicTerms,
	getAcademicTerm,
	updateAcademicTerm,
	deleteAcademicTerm,
} = require('../../controller/academic/academicTermController');
const { Admin } = require('../../module/staff/admin');

const academicTermRouter = express.Router();

academicTermRouter
	.use(isAuthenticated, roleRestriction('admin', Admin))
	.get('/', getAcademicTerms)
	.post('/', createAcademicTerm)
	.get('/:id', getAcademicTerm)
	.put('/:id', updateAcademicTerm)
	.delete('/:id', deleteAcademicTerm);

exports.academicTermRouter = academicTermRouter;
