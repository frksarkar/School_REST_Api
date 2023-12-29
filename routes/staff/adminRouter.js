const express = require('express');

const adminRouter = express.Router();

// admin register
adminRouter.post('/register', (req, res, next) => {
	try {
		res.status(201).json({
			message: 'admin register successful',
		});
	} catch (error) {
		console.log(error.message);
	}
});

// login admin
adminRouter.post('/login', (req, res, next) => {
	try {
		res.status(200).json({
			message: 'admin login successful',
		});
	} catch (error) {
		console.log(error.message);
	}
});

// get all admins
adminRouter.get('/', (req, res, next) => {
	try {
		res.status(200).json({
			message: 'get admins',
		});
	} catch (error) {
		console.log(error.message);
	}
});

// get single admin
adminRouter.get('/:id', (req, res, next) => {
	try {
		res.status(200).json({
			message: 'get admin',
		});
	} catch (error) {
		console.log(error.message);
	}
});

// update admin
adminRouter.put('/:id', (req, res, next) => {
	try {
		res.status(202).json({
			message: 'update successful',
		});
	} catch (error) {
		console.log(error.message);
	}
});

// delete single admin
adminRouter.delete('/:id', (req, res, next) => {
    try {
		res.status(200).json({
			message: 'delete admin successful',
		});
	} catch (error) {
		console.log(error.message);
	}
});

// admin suspend teacher
adminRouter.put('/suspend/teacher/:id', (req, res, next) => {
    try {
		res.status(200).json({
			message: 'teacher suspended successfully',
		});
	} catch (error) {
		console.log(error.message);
	}
});

// admin unsuspend teacher
adminRouter.put('/unsuspend/teacher/:id', (req, res, next) => {
    try {
		res.status(200).json({
			message: 'teacher unSuspended successfully',
		});
	} catch (error) {
		console.log(error.message);
	}
});

// admin withdrawn teacher
adminRouter.put('/withdrawn/teacher/:id', (req, res, next) => {
    try {
		res.status(200).json({
			message: 'teacher withdrawn successfully',
		});
	} catch (error) {
		console.log(error.message);
	}
});

// admin unWithdrawn teacher
adminRouter.put('/unwithdrawn/teacher/:id', (req, res, next) => {
    try {
		res.status(200).json({
			message: 'teacher unWithdrawn successfully',
		});
	} catch (error) {
		console.log(error.message);
	}
});

// admin publish exams
adminRouter.put('/publish/exam/:id', (req, res, next) => {
    try {
		res.status(200).json({
			message: 'exam publish successfully',
		});
	} catch (error) {
		console.log(error.message);
	}
});

// admin unpublish exams
adminRouter.put('/unpublish/exam/:id', (req, res, next) => {
    try {
		res.status(200).json({
			message: 'exam unpublish successfully',
		});
	} catch (error) {
		console.log(error.message);
	}
});

exports.adminRouter = adminRouter;
