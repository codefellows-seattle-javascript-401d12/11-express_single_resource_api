'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('joke:server');

const app = express();
app.disable('x-powered-by');

const Joke = require('./model/joke.js');
const PORT = process.env.PORT || 2000;

app.use(morgan('dev'));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.post('/api/joke', jsonParser, function(req, res, next) {
  debug('POST: /api/joke');

  Joke.createJoke(req.body)
  .then( joke => res.json(joke))
  .catch( err => next(err));
});

app.get('/api/joke', function(req, res, next) {
  debug('GET: /api/joke');

  Joke.fetchJoke(req.query.id)
  .then( joke => res.json(joke))
  .catch( err => next(err));
});

app.delete('/api/joke', function(req, res, next) {
  debug('DELETE: /api/joke');

  Joke.deleteJoke(req.query.id)
  .then( () => {
    res.status(204);
    res.end();
  })
  .catch( err => next(err)); 
});

app.use(function(err, req, res, next) { //eslint-disable-line
  debug('error middleware');
  console.error('console.error:', err.message);

  if(err.status) {
    res.status(err.status).send(err.message);
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
  return;
});
