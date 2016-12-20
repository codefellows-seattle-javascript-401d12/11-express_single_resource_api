'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('pin:server');

const app = express();
const Pin = require('./model/pin.js');
const PORT = 3000;

app.use(morgan('dev'));

app.post('/api/pin', jsonParser, function(req, res, next) {
  debug('POST: /api/pin');

  Pin.createPin(req.body)
  .then(pin => res.json(pin))
  .catch(err => next(err));
});

app.get('/api/pin', function(req, res, next) {
  debug('GET: /api/pin');

  Pin.fetchPin(req.query.id)
  .then(pin => res.json(pin))
  .catch(err => next(err));
});

app.delete('/api/pin', function(req, res, next) {
  debug('DELETE: /api/pin');

  Pin.deletePin(req.query.id)
  .then(() => res.status(204).send())
  .catch(err => next(err));
});

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
  console.log(`server running: ${PORT}`);
});
