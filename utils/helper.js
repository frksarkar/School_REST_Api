const jwt = require('jsonwebtoken');
const { defaultValue } = require('../defaultValue');

exports.tokenGenerate = function (data) {
	const secretKey = process.env.JWT_SECRET_KEY || defaultValue.jwtSecret;
	return jwt.sign(data, secretKey, { expiresIn: defaultValue.jwtExpiration });
};

exports.verifyToken = function (token) {
	const secretKey = process.env.JWT_SECRET_KEY || defaultValue.jwtSecret;
	try {
		return jwt.verify(token, secretKey);
	} catch (error) {
		return false;
	}
};
