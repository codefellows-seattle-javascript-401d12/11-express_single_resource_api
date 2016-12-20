'use strict';

const express = require('express');
const morgan = require('morgan'); //provides additional debugging inc. route times
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('joke:server'); //name of app:name of module - can name it anything

const app = express(); //it's a convention/best practice
app.disable('x-powered-by'); //stupid

const Joke = require('./model/joke.js');
const PORT = process.env.PORT || 2000;

app.use(morgan('dev')); //this adds morgan middleware every route - we don't have to call it like we do jsonParser below. //logging happens through morgan

app.listen(PORT, () => { //called "lexical error function"
  console.log(`Server listening on port ${PORT}`);
});

app.post('/api/joke', jsonParser, function(req, res, next) { //'next' isn't strictly necessary. //callback is last function. //stuff in middle is... middleware
  debug('POST: /api/joke');

  Joke.createJoke(req.body)
  .then( joke => res.json(joke))
  .catch( err => next(err));
});

app.get('/api/joke', function(req, res, next) {
  debug('GET: /api/joke');

  Joke.fetchJoke(req.query.id)
  .then( joke => res.json(joke))
  .catch( err => next(err)); //passes it down to our error-handling function?
});

app.delete('/api/joke', function(req, res, next) {
  debug('DELETE: /api/joke');

  Joke.deleteJoke(req.query.id)
  .then( () => {
    res.status(204);
    res.end();
  })
  .catch( err => next(err)); //passes it down to our error-handling function?
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
