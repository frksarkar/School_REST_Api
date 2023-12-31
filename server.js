const http = require('http');

require('dotenv').config();

const { app } = require('./app/app');
const { dbConnect } = require('./config/dbConnection');
const { defaultValue } = require('./defaultValue');

const PORT = process.env.PORT || defaultValue.PORT;
const server = http.createServer(app);
dbConnect(() => {
	server.listen(PORT, (result) => {
		console.log('server listening on port ', PORT);
	});
});
