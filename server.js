'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('bev:server');

const app = express();
const BEV = require('./model/bevs.js');

const PORT = 3000;

app.use(morgan('dev'));

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
