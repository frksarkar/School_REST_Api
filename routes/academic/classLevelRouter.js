const express = require('express');

const {
	isAuthenticated,
	roleRestriction,
} = require('../../middlewares/authHandler');
const {
	createClassLevel,
	getClassLevels,
	getClassLevel,
	updateClassLevel,
	deleteClassLevel,
} = require('../../controller/academic/classLevelController');
const { getAllData } = require('../../controller/common');
const { ClassLevel } = require('../../module/academic/classLevel');

const classLevelRouter = express.Router();

classLevelRouter
	.use(isAuthenticated, roleRestriction('admin'))
	.get('/', getAllData(ClassLevel), getClassLevels)
	.post('/', createClassLevel)
	.get('/:id', getClassLevel)
	.put('/:id', updateClassLevel)
	.delete('/:id', deleteClassLevel);

exports.classLevelRouter = classLevelRouter;
