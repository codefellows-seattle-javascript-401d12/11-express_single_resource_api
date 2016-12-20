'use strict';

const http = require('http');
const BEV = require('./model/bevs.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = 3000;
const router = new Router();

require('./route/bev-route.js')(router);

const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
