'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser');
const debug = require('debug')('bev:server');

const app = express();
const BEV = require('./model/bev.js');

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
