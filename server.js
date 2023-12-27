const http = require('http');
const { app } = require('./app/app');

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, (result) => {
	console.log('server listening on port ', PORT);
});
