const { verifyToken } = require('../utils/helper');
const { Admin } = require('../module/staff/admin');
const { Teacher } = require('../module/staff/teacher');
const { throwErr } = require('./errorHandler');
const { Student } = require('../module/academic/student');

exports.isAuthenticated = function (req, res, next) {
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

exports.roleRestriction = function (role) {
	return async function (req, res, next) {
		let Module;
		switch (role) {
			case 'admin':
				Module = Admin;
				break;
			case 'teacher':
				Module = Teacher;
				break;
			case 'student':
				Module = Student;
				break;
			default:
				break;
		}
		try {
			// find the user in the database
			const userId = req.user?.id;
			const userObj = await Module.findById(userId);
			if (!userObj) {
				throwErr('login failed', 400);
			}
			// check if the user is exist then send the user into req.obj
			if (!(userObj?.role === role)) {
				throwErr("Access denied, this you can't access this", 400);
			}
			req.user = userObj;
			next();
		} catch (error) {
			next(error);
		}
	};
};
