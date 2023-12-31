const mongoose = require('mongoose');
const { defaultValue } = require('../defaultValue');

const dbConnection = async (cb) => {
	try {
		await mongoose.connect(process.env.MONGODB_URL || defaultValue.TestDatabase);
		console.log('Connected to MongoDB');
		cb();
	} catch (err) {
		console.log('🚀 ~ file: dbConnection.js:7 ~ dbConnection ~ err:', err);
	}
};

exports.dbConnect = dbConnection;
