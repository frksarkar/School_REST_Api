const { verifyToken } = require('../utils/helper');
const { Admin } = require('../module/staff/admin');

exports.isLoggedIn = function (req, res, next) {
	// get token from header
	const token = req.headers?.authorization?.split(' ')[1];

	// token verify
	const isValidUser = verifyToken(token);
	if (!isValidUser) {
		const error = new Error('invalid authorization token');
		error.statusCode = 401;
		``;
		next(error);
	}

	// save the token into req.obj
	req.user = isValidUser;
	next();
};

exports.isAdmin = async function (req, res, next) {
	// find the user in the database
	const userId = req.user._id;
	const adminData = await Admin.findOne(userId).select('-password');

	// check if the user is exist then send the user into req.obj
	if (!adminData?.role === 'admin') {
		next('Access denied, admin can access only');
	}
	req.user = adminData;
	next();
};
