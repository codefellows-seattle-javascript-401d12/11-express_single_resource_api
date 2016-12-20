'use strict';

const express = require('express');
const Router = require('./lib/router.js');
const app = express();
const PORT = process.env.PORT || 8080;
const router = new Router();

require('./routes/student-route.js')(router);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
