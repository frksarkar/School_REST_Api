exports.errorHandler = function (err, req, res, next) {
	const stack = err.stark;
	const message = err.message;
	const status = err.status || 'failed';
	const statusCode = err.statusCode || 500;

	res.status(statusCode).json({
		status,
		message,
		stack,
	});
};

exports.notFound = function (req, res, next) {
	res.status(404).json({ message: 'page not found' });
};

// error throw function
exports.throwErr = function (message, statusCode) {
	const error = new Error(message);
	error.statusCode = statusCode;
	throw error;
};
