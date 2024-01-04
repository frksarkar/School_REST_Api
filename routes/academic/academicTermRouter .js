const express = require('express');

const { isLoggedIn, isAdmin } = require('../../middlewares/authHandler');
const {
	createAcademicTerm,
	getAcademicTerms,
	getAcademicTerm,
	updateAcademicTerm,
	deleteAcademicTerm,
} = require('../../controller/academic/academicTermController');

const academicTermRouter = express.Router();

academicTermRouter
	.use(isLoggedIn, isAdmin)
	.get('/', getAcademicTerms)
	.post('/', createAcademicTerm)
	.get('/:id', getAcademicTerm)
	.put('/:id', updateAcademicTerm)
	.delete('/:id', deleteAcademicTerm);

exports.academicTermRouter = academicTermRouter;
