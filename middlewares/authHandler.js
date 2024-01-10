const { verifyToken } = require('../utils/helper');
const { Admin } = require('../module/staff/admin');
const { Teacher } = require('../module/staff/teacher');
const { throwErr } = require('./errorHandler');
const { Student } = require('../module/academic/student');

exports.isLoggedIn = function (req, res, next) {
	try {
		// get token from header
		const token = req.headers?.authorization?.split(' ')[1];
		// token verify
		const isValidUser = verifyToken(token);
		if (!isValidUser) {
			throwErr('invalid authorization token', 401);
		}
		// save the token into req.obj
		req.user = isValidUser;
		next();
	} catch (error) {
		next(error);
	}
};

exports.isAdmin = async function (req, res, next) {
	try {
		// find the user in the database
		const userId = req?.user?.id;
		const adminData = await Admin.findById(userId);
		if (!adminData) {
			throwErr('login failed', 400);
		}
		// check if the user is exist then send the user into req.obj
		if (!adminData?.role === 'admin') {
			throwErr('Access denied, admin can access only', 400);
		}
		req.user = adminData;
		next();
	} catch (error) {
		next(error);
	}
};

exports.isLoginTeacher = function (req, res, next) {
	try {
		// get token from header
		const token = req.headers?.authorization?.split(' ')[1];
		// token verify
		const isValidUser = verifyToken(token);
		if (!isValidUser) {
			throwErr('invalid authorization token', 401);
		}
		// save the token into req.obj
		req.user = isValidUser;
		next();
	} catch (error) {
		next(error);
	}
};

exports.isTeacher = async function (req, res, next) {
	try {
		// find the user in the database
		const userId = req.user?.id;
		const teacherData = await Teacher.findById(userId);
		if (!teacherData) {
			throwErr('login failed', 400);
		}
		// check if the user is exist then send the user into req.obj
		if (!teacherData?.role === 'teacher') {
			throwErr('Access denied, teacher can access only', 400);
		}
		req.user = teacherData;
		next();
	} catch (error) {
		next(error);
	}
};

exports.isLoginStudent = function (req, res, next) {
	try {
		// get token from header
		const token = req.headers?.authorization?.split(' ')[1];
		// token verify
		const isValidUser = verifyToken(token);
		if (!isValidUser) {
			throwErr('invalid authorization token', 401);
		}
		// save the token into req.obj
		req.user = isValidUser;
		next();
	} catch (error) {
		next(error);
	}
};

exports.isStudent = async function (req, res, next) {
	try {
		// find the user in the database
		const userId = req.user?.id;
		const teacherData = await Student.findById(userId);
		if (!teacherData) {
			throwErr('login failed', 400);
		}
		// check if the user is exist then send the user into req.obj
		if (!teacherData?.role === 'teacher') {
			throwErr('Access denied, teacher can access only', 400);
		}
		req.user = teacherData;
		next();
	} catch (error) {
		next(error);
	}
};
