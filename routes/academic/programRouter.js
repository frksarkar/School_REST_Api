const express = require('express');

const { isLoggedIn, isAdmin } = require('../../middlewares/authHandler');
const {
	createProgram,
	getPrograms,
	getProgram,
	updateProgram,
	deleteProgram,
} = require('../../controller/academic/programController');

const programRouter = express.Router();

programRouter
	.use(isLoggedIn, isAdmin)
	.get('/', getPrograms)
	.post('/', createProgram)
	.get('/:id', getProgram)
	.put('/:id', updateProgram)
	.delete('/:id', deleteProgram);

exports.programRouter = programRouter;
