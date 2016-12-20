'use strict';

const debug = require('debug')('ski:server');
const express = require('express');
const app = express();
const morgan = require('morgan');
const createError = require('http-errors');
const parseJson = require('body-parser').json();
const SkiData = require('./model/ski-data.js');
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));

app.get('/api/ski', function(req, res, next) {
  debug('GET: /api/ski');

  SkiData.getData(req.query.id)
    .then( skiData => res.json(skiData))
    .catch( err => next(err));
});

app.post('/api/ski', parseJson, function(req, res, next) {
  debug('POST: /api/ski');

  SkiData.createData(req.body)
    .then( skiData => res.json(skiData))
    .catch( err => next(err));
});

app.delete('/api/ski', function(req, res, next) {
  debug('DELETE: /api/ski');

  SkiData.deleteData(req.query.id)
    .then( () => res.status(204).end())
    .catch( err => next(err));
});

// eslint-disable-next-line
app.use(function(err, req, res, next) {
  debug('error handler middleware');

  if(err.status) {
    res.status(err.status).send(err.name);
    return;
  }
  err = createError(500, res.message);
  res.status(err.status).send(err.name);
});

app.listen(PORT, () => {
  console.log(`Server up: ${PORT}`);
});
