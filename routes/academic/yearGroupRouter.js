const express = require('express');

const { isLoggedIn, isAdmin } = require('../../middlewares/authHandler');
const {
	createYearGroup,
	getYearGroups,
	getYearGroup,
	updateYearGroup,
	deleteYearGroup,
} = require('../../controller/academic/yearGroupController');

const yearGroupRouter = express.Router();

yearGroupRouter
	.use(isLoggedIn, isAdmin)
	.get('/', getYearGroups)
	.post('/', createYearGroup)
	.get('/:id', getYearGroup)
	.put('/:id', updateYearGroup)
	.delete('/:id', deleteYearGroup);

exports.yearGroupRouter = yearGroupRouter;
