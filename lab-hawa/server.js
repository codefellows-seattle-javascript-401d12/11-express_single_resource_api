'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('spiritAnimal:server');
const app = express();
const SpiritAnimal = require('./model/spiritAnimal.js');
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));

app.post('/api/spiritAnimal', jsonParser, function(req, res, next) {
  debug('POST: /api/spiritAnimal');
  //TODO: build POST route
  SpiritAnimal.createSpiritAnimal(req.body)
  .then( spiritAnimal => res.json(spiritAnimal))
  .catch( err => next(err));
});

app.get('/api/spiritAnimal', function(req, res, next) {
  debug('GET: /api/spiritAnimal');

  SpiritAnimal.fetchSpiritAnimal(req.query.id)
  .then( spiritAnimal => res.json(spiritAnimal))
  .catch( err => next(err));
});

app.delete('/api/spiritAnimal', function(req, res, next) {
  debug('DELETE: /api/spiritAnimal');

  SpiritAnimal.deleteSpiritAnimal(req.query.id)
  .then( () => res.status(204).send(''))
  .catch ( err => next(err));
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
  console.log(`server up: ${PORT}`);
});
