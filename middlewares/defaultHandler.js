exports.defaultHandler = function (req, res, next) {
	req.user = {};
	next();
};
