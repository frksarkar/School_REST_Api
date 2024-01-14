const express = require('express');

const {
	createAcademicYear,
	getAcademicYears,
	getAcademicYear,
	updateAcademicYear,
	deleteAcademicYear,
} = require('../../controller/academic/academicYearController');
const {
	isAuthenticated,
	roleRestriction,
} = require('../../middlewares/authHandler');

const academicYearRouter = express.Router();

academicYearRouter
	.use(isAuthenticated, roleRestriction('admin'))
	.get('/', getAcademicYears)
	.post('/', createAcademicYear)
	.get('/:id', getAcademicYear)
	.put('/:id', updateAcademicYear)
	.delete('/:id', deleteAcademicYear);

exports.academicYearRouter = academicYearRouter;
