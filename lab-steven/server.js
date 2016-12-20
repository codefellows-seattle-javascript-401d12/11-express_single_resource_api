'use strict';

const http = require('http');
const Router = require('./lib/router.js');
const PORT = process.env.PORT || 8080;
const router = new Router();

require('./routes/student-route.js')(router);

const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
