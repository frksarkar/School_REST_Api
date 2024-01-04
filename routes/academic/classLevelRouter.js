const express = require('express');

const { isLoggedIn, isAdmin } = require('../../middlewares/authHandler');
const {
	createClassLevel,
	getClassLevels,
	getClassLevel,
	updateClassLevel,
	deleteClassLevel,
} = require('../../controller/academic/classLevelController');

const classLevelRouter = express.Router();

classLevelRouter
	.use(isLoggedIn, isAdmin)
	.get('/', getClassLevels)
	.post('/', createClassLevel)
	.get('/:id', getClassLevel)
	.put('/:id', updateClassLevel)
	.delete('/:id', deleteClassLevel);

exports.classLevelRouter = classLevelRouter;
