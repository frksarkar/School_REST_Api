const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { defaultValue } = require('../defaultValue');

exports.tokenGenerate = function (data, expireTime) {
	const secretKey = process.env.JWT_SECRET_KEY || defaultValue.jwtSecret;
	return jwt.sign(data, secretKey, { expiresIn: expireTime });
};

exports.verifyToken = function (token) {
	const secretKey = process.env.JWT_SECRET_KEY || defaultValue.jwtSecret;
	try {
		return jwt.verify(token, secretKey);
	} catch (error) {
		return false; 
	}
};

exports.passwordEncrypt = async function (next) {
	if (this.password.length > 30) {
		next();
		return;
	}
	const passwordHash = await bcrypt.hash(this.password, 12);
	this.password = passwordHash;

	next();
};

exports.isValidPassword = function (enterPassword) {
	return bcrypt.compare(enterPassword, this.password);
};

