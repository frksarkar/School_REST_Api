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
const { getAllData } = require('../../controller/common');
const { AcademicYear } = require('../../module/academic/academicYear');

const academicYearRouter = express.Router();

academicYearRouter
	.use(isAuthenticated, roleRestriction('admin'))
	.get('/', getAllData(AcademicYear), getAcademicYears)
	.post('/', createAcademicYear)
	.get('/:id', getAcademicYear)
	.put('/:id', updateAcademicYear)
	.delete('/:id', deleteAcademicYear);

exports.academicYearRouter = academicYearRouter;
