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

app.get('/api/bev', function(req, res, next) {
  debug('GET: api/bev');

  if (req.query.id) {
    BEV.fetchVehicle(req.query.id)
    .then( vehicle => res.json(vehicle))
    .catch( err => next(err));
  };

  if (!req.query.id) {
    BEV.fetchAllVehicles()
    .then( vehicles => res.json(vehicles))
    .catch( err => next(err));
  };
});

app.delete('/api/bev', function(req, res, next) {
  BEV.deleteVehicle(req.query.id)
  .then( vehicle => res.json(vehicle))
  .catch( err => next(err));
});

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
