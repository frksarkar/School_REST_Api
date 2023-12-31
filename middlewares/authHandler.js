const { verifyToken } = require('../utils/helper');

exports.isLoggedIn = function (req, res, next) {
	const token = req.headers.authorization.split(' ')[1];
	const isValidUser = verifyToken(token);
	if (!isValidUser) {
		const error = new Error('invalid authorization token');
		error.statusCode = 401;
		next(error);
	}
	req.user = isValidUser;
	next();
};
