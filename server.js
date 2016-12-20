'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('note:server');

const app = express();
const Dog = require('./model/dogs.js');
const PORT = process.env.PORT || 8000;

app.use(morgan('dev'));

app.get('/test', function(req,res) {
  debug('Debugging /test route');
  res.json( {'msg': 'test route worked'});
});

app.post('/api/dog', jsonParser, function(req, res, next) {
  debug('POST: /api/dog');

  Dog.createDog(req.body)
  .then( dog => res.json(dog))
  .catch( err => next(err));
});

app.get('/api/dog', function(req, res, next) {
  debug('GET: /api/dog');

  Dog.fetchDog(req.query.id)
  .then( dog => res.json(dog))
  .catch( err => next(err));
});

app.use(function(err, req, res, next) {
  debug('error middleware');
  console.error(err.message);

  if(err.status) {
    res.status(err.status).send(err.name);
    return;
  };

  err.createError(500, err.message);
  res.status(err.status).send(err.name);
});

app.listen(PORT, () => {
  console.log(`server up on PORT: ${PORT}`);
});
