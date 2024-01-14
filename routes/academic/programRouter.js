const express = require('express');

const { isAuthenticated, roleRestriction } = require('../../middlewares/authHandler');
const {
	createProgram,
	getPrograms,
	getProgram,
	updateProgram,
	deleteProgram,
} = require('../../controller/academic/programController');

const programRouter = express.Router();

programRouter
	.use(isAuthenticated, roleRestriction('admin'))
	.get('/', getPrograms)
	.post('/', createProgram)
	.get('/:id', getProgram)
	.put('/:id', updateProgram)
	.delete('/:id', deleteProgram);

exports.programRouter = programRouter;
