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

app.post('/api/bev', jsonParser, function(req, res, next) {
  debug('POST: api/bev');

  BEV.createVehicle(req.body)
  .then( vehicle => res.json(vehicle))
  .catch( err => next(err));
});

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
