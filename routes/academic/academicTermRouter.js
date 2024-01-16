const express = require('express');

const auth = require('../../middlewares/authHandler');
const acaTerm = require('../../controller/academic/academicTermController');
const { Admin } = require('../../module/staff/admin');
const { getAllData } = require('../../controller/common');
const { AcademicTerm } = require('../../module/academic/academicTerm');

const academicTermRouter = express.Router();

academicTermRouter
	.use(auth.isAuthenticated, auth.roleRestriction('admin', Admin))
	.get('/', getAllData(AcademicTerm), acaTerm.getAcademicTerms)
	.post('/', acaTerm.createAcademicTerm)
	.get('/:id', acaTerm.getAcademicTerm)
	.put('/:id', acaTerm.updateAcademicTerm)
	.delete('/:id', acaTerm.deleteAcademicTerm);

exports.academicTermRouter = academicTermRouter;
