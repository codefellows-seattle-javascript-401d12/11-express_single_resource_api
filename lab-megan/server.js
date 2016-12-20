'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('cheese:server');

const Cheese = require('./model/cheese');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.get('/test', function(req, res) {
  debug('GET: /test');
  res.json({ msg: 'test route worked' });
});

app.get('/data/cheese', function(req, res, next) {
  debug('GET: /data/cheese');
  Cheese.fetchCheese(req.query.id)
  .then( cheese => res.json(cheese))
  .catch( err => next(err));
});

app.post('/data/cheese', jsonParser, function(req, res, next) {
  debug('POST: /data/cheese');
  Cheese.createCheese(req.body)
  .then( cheese => res.json(cheese))
  .catch( err => next(err));
});

app.delete('/data/cheese', function(req, res, next) {
  debug('DELETE: /data/cheese');
  res.status(204).send();
  Cheese.deleteCheese(req.query.id)
  .then()
  .catch( err => next(err));
});

// eslint-disable-next-line
app.use(function(err, req, res, next) {
  debug('error middleware');
  console.error(err.message);

  if (err.status) {
    res.status(err.status).send(err.name);
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
});

app.listen(PORT, () => {
  debug(`server up: ${PORT}`);
});
