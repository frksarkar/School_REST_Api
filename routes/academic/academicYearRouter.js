const express = require('express');
const {
	createAcademicYear,
	getAcademicYears,
	getAcademicYear,
	updateAcademicYear,
	deleteAcademicYear,
} = require('../../controller/academic/academicYearController');
const { isLoggedIn, isAdmin } = require('../../middlewares/authHandler');

const academicYearRouter = express.Router();

academicYearRouter.post('/', isLoggedIn, isAdmin, createAcademicYear);

academicYearRouter.get('/', isLoggedIn, isAdmin, getAcademicYears);

academicYearRouter.get('/:id', isLoggedIn, isAdmin, getAcademicYear);

academicYearRouter.put('/:id', isLoggedIn, isAdmin, updateAcademicYear);

academicYearRouter.delete('/:id', isLoggedIn, isAdmin, deleteAcademicYear);

exports.academicYearRouter = academicYearRouter;
