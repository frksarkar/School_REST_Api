const express = require('express');

const {
	isAuthenticated,
	roleRestriction,
} = require('../../middlewares/authHandler');
const {
	createYearGroup,
	getYearGroups,
	getYearGroup,
	updateYearGroup,
	deleteYearGroup,
} = require('../../controller/academic/yearGroupController');
const { getAllData } = require('../../controller/common');
const { YearGroup } = require('../../module/academic/yearGroup');

const yearGroupRouter = express.Router();

yearGroupRouter
	.use(isAuthenticated, roleRestriction('admin'))
	.get('/', getAllData(YearGroup), getYearGroups)
	.post('/', createYearGroup)
	.get('/:id', getYearGroup)
	.put('/:id', updateYearGroup)
	.delete('/:id', deleteYearGroup);

exports.yearGroupRouter = yearGroupRouter;
